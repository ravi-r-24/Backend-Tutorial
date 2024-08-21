import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // to upload the file to the local file

// configure the cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// method to upload file on cloudinary
const uploadToCloudinary = async (localFilePath) => {
    try {
        // check if there is localFilePath
        if (!localFilePath) return null;

        // if localFilePath is available, upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // check if the file was successfully uploaded to cloudinary
        if (!response) {
            console.log(`Failed to upload the file to cloudinary`);

            // remove the file from the local storage as failed to upload on cloudinary
            fs.unlinkSync(localFilePath);

            return null;
        }

        // if file was successfully uploaded to cloudinary
        console.log(`File was successfully uploaded to cloudinary`);

        // remove the file from local storage as it is moved to the cloudinary
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // if file upload failed, then remove the file from local storage
        fs.unlinkSync(localFilePath);
        console.log(`Failed to upload the file due to error: ${error.message}`);
        return null;
    }
};

export default uploadToCloudinary;
