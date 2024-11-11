// enables file uploads to MongoDB using GridFS, 
// storing files in a bucket named "photos" 
// if they are PNG or JPG images.Other file types are 
// simply stored by filename without being placed in GridFS.

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

require('dotenv').config();


const storage = new GridFsStorage({
    url: process.env.DB,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1)
            return `${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

module.exports = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }  // 5MB limit
});