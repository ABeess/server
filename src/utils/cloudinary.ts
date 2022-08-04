import { UploadApiResponse, v2 } from 'cloudinary';
import { unlink } from 'fs';
import { InternalServerError } from '../lib/Errors';

const cloudinary = v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadCloudinary = async (file: any, publicId: string | number): Promise<UploadApiResponse> => {
  const upload = await cloudinary.uploader.upload(file.path, {
    overwrite: true,
    public_id: `user_${publicId}`,
  });
  console.log(upload);

  unlink(file.path, (err) => {
    if (err) {
      throw new InternalServerError(err.message);
    }
  });

  return upload;
};

export default cloudinary;
