import { Column, Entity } from 'typeorm';
import Model from './Model';

@Entity()
export class ChatRoom extends Model {
  @Column({ nullable: true })
  user_id: string;

  @Column({ nullable: true })
  room: string;
}
