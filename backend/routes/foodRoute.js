// defines API endpoints(URLs) for food-related operations like adding, listing, and removing food items

import express from 'express'
import { addFood,listFood,removeFood } from '../controllers/foodController.js'
import multer from 'multer'
import { storage } from '../config/cloudinary.js'

const foodRouter = express.Router();

// Using Cloudinary storage from config
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        console.log("File received:", file.originalname);
        cb(null, true);
    }
})

foodRouter.post("/add", (req, res, next) => {
    console.log("POST /add request received");
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error("Multer error:", err.message);
            return res.json({ success: false, message: "File upload error: " + err.message });
        }
        console.log("Multer upload complete, calling addFood controller");
        addFood(req, res);
    });
});

foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);

export default foodRouter;