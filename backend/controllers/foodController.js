// Food controller with PostgreSQL raw SQL queries
// this file is used to handle food related operations such as adding food items, listing food items and removing food items

import pool from "../config/db.js";

// add food item
const addFood = async (req, res) => {
    // Check if file was uploaded
    if (!req.file) {
        return res.json({ success: false, message: "No image file uploaded" });
    }
    
    // For Cloudinary storage, req.file.path contains the full URL
    let image_url = req.file.path; // Cloudinary returns full URL in path property
    let recipeSteps = req.body.recipe ? JSON.parse(req.body.recipe) : []; // parse recipe steps if provided

    try {
        await pool.query(
            'INSERT INTO food (name, description, price, image, category, recipe) VALUES ($1, $2, $3, $4, $5, $6::jsonb)',
            [req.body.name, req.body.description, req.body.price, image_url, req.body.category, JSON.stringify(recipeSteps)]
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
        // Delete the food item from database
        // Note: For Cloudinary-stored images, deletion is optional
        // Images remain in Cloudinary but are dereferenced in DB
        await pool.query('DELETE FROM food WHERE id = $1', [req.body.id]);
        
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error!" });
    }
};

export { addFood, listFood, removeFood };