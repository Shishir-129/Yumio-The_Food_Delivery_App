import { v2 as cloudinary } from 'cloudinary';
import pkg from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

const { CloudinaryStorage } = pkg;

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'yumio-food-items',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
    }
});

export { cloudinary, storage };
