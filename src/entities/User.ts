import { Column, Entity, OneToOne } from 'typeorm';
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

  @Column()
  password!: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user, {
    cascade: true,
  })
  userInfo?: UserInfo;
}
