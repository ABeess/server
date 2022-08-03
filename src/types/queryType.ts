import { FindOptionsWhere, ObjectID } from 'typeorm';
import { User } from '../entities/User';
import UserInfo from '../entities/UserInfo';

export type UserQuery =
  | string
  | number
  | string[]
  | FindOptionsWhere<User>
  | Date
  | ObjectID
  | number[]
  | Date[]
  | ObjectID[];

export type UserInfoQuery =
  | string
  | number
  | string[]
  | FindOptionsWhere<UserInfo>
  | Date
  | ObjectID
  | number[]
  | Date[]
  | ObjectID[];
