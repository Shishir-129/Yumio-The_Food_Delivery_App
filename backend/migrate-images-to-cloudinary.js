// Migration script to upload existing local images to Cloudinary
import pool from './config/db.js';
import { cloudinary } from './config/cloudinary.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateImagesToCloudinary() {
    try {
        console.log('Starting image migration to Cloudinary...\n');

        // Get all food items from database
        const result = await pool.query('SELECT id, name, image FROM food');
        const foodItems = result.rows;

        console.log(`Found ${foodItems.length} food items in database\n`);

        let uploaded = 0;
        let skipped = 0;
        let failed = 0;

        for (const item of foodItems) {
            // Skip if already a Cloudinary URL
            if (item.image && item.image.includes('cloudinary.com')) {
                console.log(`✓ Skipped: ${item.name} (already on Cloudinary)`);
                skipped++;
                continue;
            }

            // Skip if no image
            if (!item.image) {
                console.log(`✗ Skipped: ${item.name} (no image)`);
                skipped++;
                continue;
            }

            // Construct local file path
            const localImagePath = path.join(__dirname, 'uploads', item.image);

            // Check if file exists
            if (!fs.existsSync(localImagePath)) {
                console.log(`✗ Failed: ${item.name} (file not found: ${item.image})`);
                failed++;
                continue;
            }

            try {
                // Upload to Cloudinary
                const uploadResult = await cloudinary.uploader.upload(localImagePath, {
                    folder: 'yumio-food-items',
                    public_id: item.image.split('.')[0], // Use original filename without extension
                    overwrite: true
                });

                // Update database with Cloudinary URL
                await pool.query(
                    'UPDATE food SET image = $1 WHERE id = $2',
                    [uploadResult.secure_url, item.id]
                );

                console.log(`✓ Uploaded: ${item.name} -> ${uploadResult.secure_url}`);
                uploaded++;

            } catch (uploadError) {
                console.log(`✗ Failed: ${item.name} - ${uploadError.message}`);
                failed++;
            }
        }

        console.log('\n=== Migration Summary ===');
        console.log(`Total items: ${foodItems.length}`);
        console.log(`Successfully uploaded: ${uploaded}`);
        console.log(`Skipped: ${skipped}`);
        console.log(`Failed: ${failed}`);
        console.log('=========================\n');

        if (uploaded > 0) {
            console.log('✓ Migration completed successfully!');
        } else {
            console.log('⚠ No new images were uploaded.');
        }

    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        // Close database connection
        await pool.end();
    }
}

// Run migration
migrateImagesToCloudinary();
