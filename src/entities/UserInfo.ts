import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import Model from './Model';
import { User } from './User';

@Entity()
export default class UserInfo extends Model {
  @Column({ nullable: true })
  phoneNumber: number;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  public_id: string;

  @OneToOne(() => User, (user) => user.userInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
