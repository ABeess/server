import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './Model';
import { User } from './User';

@Entity()
export class Message extends Model {
  @Column()
  receive: string;

  @ManyToOne(() => User, (user) => user.messages, { cascade: true })
  @JoinColumn()
  sender: User;

  @Column()
  message: string;
}
