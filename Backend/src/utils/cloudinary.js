import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // file system from NodeJS

// configure cloudinary
cloudinary.configure({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// method to upload files on cloudinary
const uploadOnCloudinary = async (localFilePath, remoteFilePath) => {
  try {
    if (!localFilePath) return null;
    //   upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //   file has been uploaded successfully
    console.log(`File uploaded successfully on cloudinary ${response.url}`);
    return response;
  } catch {
    fs.unlinkSync(localFilePath); // Will remove the temporary file, saved locally as upload operation failed
  }
};

export { uploadOnCloudinary };
