import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// DELETE endpoint to remove all food items with local filenames (broken from Cloudinary migration)
router.delete('/cleanup-broken-food', async (req, res) => {
    try {
        const result = await db.query(
            "DELETE FROM food WHERE image NOT LIKE 'https://%' AND image NOT LIKE 'http://%' RETURNING id, name, image"
        );

        res.json({
            success: true,
            message: `Cleaned up ${result.rowCount} broken food items`,
            deletedItems: result.rows
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Cleanup failed: " + error.message
        });
    }
});

// GET endpoint to view all broken food items without deleting
router.get('/check-broken-food', async (req, res) => {
    try {
        const result = await db.query(
            "SELECT id, name, image FROM food WHERE image NOT LIKE 'https://%' AND image NOT LIKE 'http://%' ORDER BY id"
        );

        res.json({
            success: true,
            count: result.rowCount,
            items: result.rows
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Check failed: " + error.message
        });
    }
});

export default router;
