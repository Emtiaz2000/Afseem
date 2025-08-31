// cloudinary.js
import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY ,
  api_secret:process.env.CLOUDINARY_API_SECRET ,
});
// Utility function to upload buffer to cloudinary
export const uploadToCloudinary = (buffer, folder = "products") => {
    //console.log(process.env.CLOUDINARY_API_KEY)
  return new Promise((resolve, reject) => {
    const cldUploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(cldUploadStream);
  });
};

