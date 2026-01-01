import {v2 as cloudinary} from "cloudinary"
import { log } from "console";
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (LocalfilePath) => {
    try {
        if(!LocalfilePath) return null
        // uploading files on cloudinary
        const response = await cloudinary.uploader.upload(LocalfilePath,{
            resource_type: "auto"
        })
        // uploaded successfully
        console.log("file uploaded on cloudinary successfully",response.url);
        return response;
        } catch( error){
            fs.unlinkSync(LocalfilePath) // deleting the local file in case of error
            return null;
    }
}

export { uploadOnCloudinary }