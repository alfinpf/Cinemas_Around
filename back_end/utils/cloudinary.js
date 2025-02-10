const fs = require('fs');
const { cloudinaryInstance } = require('../config/cloudinaryConfig');

const imageUploadCloudinary = async (path) => {
    
    try {
        const uploadResult = await cloudinaryInstance.uploader.upload(path, {
            transformation: [
                { aspect_ratio: '9:16', crop: 'fill', width: 1920, height: 1080 }
            ]
        });

        fs.unlink(path, (err) => {
            if (err) {
                console.error(`Failed to delete local file: ${err.message}`);
            }
        });

        return uploadResult.secure_url;
    } catch (error) {
        console.log(error);
        
        throw new Error(error.message || "Internal server error");
    }
};

module.exports = imageUploadCloudinary;
