import { Message } from '../entities/Meessage';
import { User } from '../entities/User';
import UserInfo from '../entities/UserInfo';

export interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  googleId?: string;
  githubId?: string;
  provider?: string;
  avatar?: string;
  code?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserInfoInput extends Partial<UserInfo> {
  user?: User;
}

export interface ChatRoomInput {
  sender: string;
  receive: string;
  room: string;
}

export interface MessageInput extends Partial<Message> {}
