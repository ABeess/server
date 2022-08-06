import { UploadApiResponse } from 'cloudinary';
import UserInfo from '../entities/UserInfo';
import { BadRequestError, NotFoundError } from '../lib/Errors';
import UserInfoRepository from '../repository/userInfoRepository';
import userRepository from '../repository/userRepository';
import { UserInfoInput } from '../types/InputType';
import { singleUpload } from '../utils/cloudinary';

interface ParameterType {
  body: UserInfoInput;
  userId: number;
  file?: Express.Multer.File;
}

class UserService {
  async createAndUpdate({ body, userId, file }: ParameterType): Promise<UserInfo | null> {
    if (!userId) {
      throw new BadRequestError('Missing the parameter');
    }

    const existingUser = await userRepository.findOne(
      { id: userId },
      {
        relations: ['userInfo'],
      }
    );

    if (!existingUser) {
      throw new NotFoundError('User dose not exist on the system');
    }

    const upload = file && ((await singleUpload(file, userId)) as UploadApiResponse);
    const data = upload
      ? {
          ...body,
          avatar: upload.secure_url,
          public_id: upload.public_id,
        }
      : body;

    const existingUserInfo = existingUser.userInfo;

    if (existingUserInfo) {
      const newUserInfo = await UserInfoRepository.updateById(existingUserInfo.id, data);
      // console.log(newUserInfo);
      return newUserInfo.raw[0];
    }

    const newUserInfo = await UserInfoRepository.insert({
      ...data,
      user: existingUser,
    });
    console.log(newUserInfo);
    return newUserInfo.raw[0];
  }
}

export default new UserService();
