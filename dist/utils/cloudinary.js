"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = require("fs");
const Errors_1 = require("../lib/Errors");
const cloudinary = cloudinary_1.v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadCloudinary = async (file, publicId) => {
    const upload = await cloudinary.uploader.upload(file.path, {
        overwrite: true,
        public_id: `user_${publicId}`,
    });
    console.log(upload);
    (0, fs_1.unlink)(file.path, (err) => {
        if (err) {
            throw new Errors_1.InternalServerError(err.message);
        }
    });
    return upload;
};
exports.uploadCloudinary = uploadCloudinary;
exports.default = cloudinary;
//# sourceMappingURL=cloudinary.js.map