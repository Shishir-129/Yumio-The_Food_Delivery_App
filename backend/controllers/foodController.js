// Food controller with PostgreSQL raw SQL queries
// this file is used to handle food related operations such as adding food items, listing food items and removing food items

import pool from "../config/db.js";
import { cloudinary } from "../config/cloudinary.js";

// add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.path}`; // Cloudinary URL
    let recipeSteps = req.body.recipe ? JSON.parse(req.body.recipe) : []; // parse recipe steps if provided

    try {
        await pool.query(
            'INSERT INTO food (name, description, price, image, category, recipe) VALUES ($1, $2, $3, $4, $5, $6::jsonb)',
            [req.body.name, req.body.description, req.body.price, image_filename, req.body.category, JSON.stringify(recipeSteps)]
        );
        res.json({ success: true, message: "Food Item Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error!" });
    }
};

// all food list
const listFood = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM food ORDER BY id DESC');
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error!" });
    }
};

// remove food item
const removeFood = async (req, res) => {
    try {
        // First, get the food item to get the image URL
        const foodResult = await pool.query('SELECT image FROM food WHERE id = $1', [req.body.id]);
        
        if (foodResult.rows.length === 0) {
            return res.json({ success: false, message: "Food item not found" });
        }

        const food = foodResult.rows[0];
        
        // Delete the image from Cloudinary if it exists
        if (food.image) {
            // Extract public_id from Cloudinary URL
            // URL format: https://res.cloudinary.com/[cloud_name]/image/upload/v[version]/[folder]/[filename]
            // We need: yumio-food-items/[filename]
            const urlParts = food.image.split('/');
            const filename = urlParts[urlParts.length - 1]; // Get filename
            const public_id = `yumio-food-items/${filename.split('.')[0]}`; // Construct public_id
            
            try {
                await cloudinary.uploader.destroy(public_id);
            } catch (cloudError) {
                console.log('Cloudinary deletion error:', cloudError);
            }
        }

        // Delete the food item from database
        await pool.query('DELETE FROM food WHERE id = $1', [req.body.id]);
        
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error!" });
    }
};

export { addFood, listFood, removeFood };