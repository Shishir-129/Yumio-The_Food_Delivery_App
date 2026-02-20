import { v2 as cloudinary } from 'cloudinary';
import multerStorageCloudinary from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer Storage
const storage = new multerStorageCloudinary({
    cloudinary: cloudinary,
    params: {
        folder: 'yumio-food-items',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
});

export { cloudinary, storage };