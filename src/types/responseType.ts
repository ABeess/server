import { User } from '../entities/User';

export interface IOAuthResponse extends User {
  code?: number;
  message?: string;
}
