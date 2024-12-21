import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
cloudinary.config({
   cloud_name:process.env.CLOUD_NAME,
   api_key:process.env.API_KEY,
   api_secret:process.env.API_SECRET

})
 const uploadImage=async(image)=>{


  try {
    if(!image){
        return null;
    }
    const uploadedImage= await cloudinary.uploader.upload(image, 
        {resource_type:"auto"});
        console.log("file uploaded successfully")
        console.log(uploadedImage.url)
        fs.unlinkSync(image)
        return uploadedImage;

  } catch (error) {
    fs.unlinkSync(image)
    console.log(error)
    throw error;
  }
 } 
 export default  uploadImage;



