import { User } from '../entities/User';
import UserInfo from '../entities/UserInfo';

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserInfoInput extends Partial<UserInfo> {
  user: User;
}
