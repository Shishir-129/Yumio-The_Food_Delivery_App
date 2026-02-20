import * as cloudinary from 'cloudinary';
import CloudinaryStorage from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("Cloudinary config:", { cloud_name: process.env.CLOUDINARY_CLOUD_NAME });

// Configure Multer Storage - CloudinaryStorage is the default export
// Note: CloudinaryStorage expects the full cloudinary namespace with .v2 property
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'yumio-food-items',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
    }
});

console.log("Cloudinary storage configured");

export { cloudinary, storage };
