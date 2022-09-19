import { Column, Entity } from 'typeorm';
import Model from './Model';

@Entity()
export class UserRoom extends Model {
  @Column()
  user_id: string;

  @Column()
  room: string;
}
