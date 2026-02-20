// Food controller with PostgreSQL raw SQL queries
// this file is used to handle food related operations such as adding food items, listing food items and removing food items

import pool from "../config/db.js";

// add food item
const addFood = async (req, res) => {
    // Check if file was uploaded
    if (!req.file) {
        return res.json({ success: false, message: "No image file uploaded" });
    }
    
    // Debug: Log the entire req.file object to see what multer returns
    console.log("DEBUG req.file:", JSON.stringify(req.file, null, 2));
    
    // For Cloudinary storage, construct the full URL manually
    // req.file might have: filename, path, public_id, or secure_url
    let image_url;
    
    if (req.file.secure_url) {
        image_url = req.file.secure_url; // Cloudinary secure URL
    } else if (req.file.path) {
        image_url = req.file.path; // Full URL if path exists
    } else if (req.file.public_id) {
        // Construct URL manually from public_id
        const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
        image_url = `https://res.cloudinary.com/${cloudinaryName}/image/upload/${req.file.public_id}`;
    } else {
        return res.json({ success: false, message: "Failed to get image URL from Cloudinary" });
    }
    
    console.log("Final image_url:", image_url);
    
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