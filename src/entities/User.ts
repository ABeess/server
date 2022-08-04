import { Column, Entity, OneToOne } from 'typeorm';
import Model from './Model';
import UserInfo from './UserInfo';

@Entity()
export class User extends Model {
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user, {
    cascade: true,
  })
  userInfo?: UserInfo;
}
