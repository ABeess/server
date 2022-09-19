import { FindOperator } from 'typeorm';
import { ChatRoom } from '../entities/ChatRoom';
import { User } from '../entities/User';
import { WhereOption } from './RepositoryFindOptions';

export type Nullable<T> = T | null;

export interface SocketChat extends Partial<User> {
  sender: User;
  receive: string;
  message: string;
}
