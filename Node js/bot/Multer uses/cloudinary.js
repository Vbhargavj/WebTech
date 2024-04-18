import { v2 as cloudinary } from "cloudinary";
import { fs } from "fs";

cloudinary.config({
  cloud_name: "djgfzl7a3",
  api_key: "882112858363691",
  api_secret: "0PHANDjpqzGpcww9NT4dfqjz3p4",
});

exports.uploadOnCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("Yes i am ready with ", response.url);

    return response;
  } catch (error) {
    console.log("sdfb");
    fs.unlink(localFilePath);
    return null;
  }
};
