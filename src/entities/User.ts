import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Message } from './Meessage';
import Model from './Model';
import UserInfo from './UserInfo';

@Entity()
export class User extends Model {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true, unique: true })
  googleId: string;

  @Column({ nullable: true, unique: true })
  githubId: string;

  @Column({ nullable: true })
  provider: string;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user, {
    cascade: true,
  })
  userInfo?: UserInfo;

  @OneToMany(() => Message, (message) => message.sender)
  messages?: Message[];
}
