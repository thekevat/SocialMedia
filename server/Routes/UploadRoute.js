import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const router=express.Router();
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'social_media_posts',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => Date.now() + '-' + file.originalname
  },
});

const upload = multer({ storage });

router.post('/', upload.single("file"), (req, res) => {
  try {
    // The uploaded file's Cloudinary URL
    const imageUrl = req.file.path;
    return res.status(200).json({ imageUrl });
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;