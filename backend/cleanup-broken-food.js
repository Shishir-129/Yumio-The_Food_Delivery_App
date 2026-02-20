import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL
});

async function cleanupBrokenFood() {
    try {
        await client.connect();
        console.log("Connected to database");

        // Find all food items with local filenames (not starting with https)
        const result = await client.query(
            "SELECT id, name, image FROM food WHERE image NOT LIKE 'https://%' AND image NOT LIKE 'http://%'"
        );

        console.log(`\nFound ${result.rows.length} items with local filenames:`);
        result.rows.forEach(row => {
            console.log(`  ID: ${row.id}, Name: ${row.name}, Image: ${row.image}`);
        });

        if (result.rows.length === 0) {
            console.log("\n✅ No broken items found! All food items have Cloudinary URLs.");
            await client.end();
            return;
        }

        // Ask for confirmation (in real script, just do it)
        console.log("\n⚠️  Deleting these items from database...");
        
        const deleteResult = await client.query(
            "DELETE FROM food WHERE image NOT LIKE 'https://%' AND image NOT LIKE 'http://%'"
        );

        console.log(`\n✅ Deleted ${deleteResult.rowCount} items with local filenames`);
        console.log("The broken items are now removed. You can re-add them through the admin panel with proper Cloudinary images.");

        await client.end();
    } catch (error) {
        console.error("❌ Error:", error.message);
        await client.end();
        process.exit(1);
    }
}

cleanupBrokenFood();
