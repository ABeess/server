import { Column, Entity, OneToOne } from 'typeorm'
import Model from './Model'
import { User } from './User'

@Entity()
export default class UserInfo extends Model {
  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @Column()
  phoneNumber!: number

  @Column()
  gender: string

  @Column()
  address: string

  @Column()
  avatar: string

  @OneToOne(() => User, (user) => user.userInfo)
  user: User
}
