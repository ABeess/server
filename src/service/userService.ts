import UserInfo from '../entities/UserInfo';
import { BadRequestError, NotFoundError } from '../lib/Errors';
import UserInfoRepository from '../repository/userInfoRepository';
import userRepository from '../repository/userRepository';

class UserService {
  async createAndUpdate(body: UserInfo, userId: number): Promise<UserInfo | null> {
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

    const existingUserInfo = existingUser.userInfo;

    if (existingUserInfo) {
      const newUserInfo = await UserInfoRepository.update(existingUserInfo.id, body);
      // console.log(newUserInfo);
      return newUserInfo.raw[0];
    }

    const newUserInfo = await UserInfoRepository.insert({
      ...body,
      user: existingUser,
    });
    console.log(newUserInfo);
    return newUserInfo.raw[0];
  }
}

export default new UserService();
