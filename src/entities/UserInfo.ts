import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import Model from './Model';
import { User } from './User';

@Entity()
export default class UserInfo extends Model {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  phoneNumber!: number;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  public_id: string;

  @OneToOne(() => User, (user) => user.userInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
