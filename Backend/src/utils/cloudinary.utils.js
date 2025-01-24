//? Import modules
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs";

//? Configure cloudinary with required credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//? Function to upload media on cloudinary
export const uploadOnCloudinary = async (localFilePath) => {
  try {
    //* If there is no local file path, return null
    if (!localFilePath) return null;

    //* Upload file on cloudinary using file's local path created by multer
    const uploadRes = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "Home/Hackathon",
    });

    //* Log the url to console
    console.log("File uploaded to cloudinary ===>>>", uploadRes.url);

    //* After uploading the file on cloudinary, delete the file from server's disk storage and return upload response
    fs.unlinkSync(localFilePath);
    return uploadRes;
  } catch (error) {
    //* In case of an error, delete the file from the temporary disk storage and return null
    fs.unlinkSync(localFilePath);
    return null;
  }
};
