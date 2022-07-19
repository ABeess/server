import { Repository, UpdateResult } from 'typeorm'
import { User } from '../entities/User'
import { userRepository } from '../utils/repository'

class userService {
  constructor(private userRepository: Repository<User>) {}

  async findOne(params: string, query: string): Promise<User | null> {
    return this.userRepository.findOne({
      relations: ['userInfo'],
      where: { [params]: query },
      select: {
        id: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }
  async update(query: string, params: object): Promise<UpdateResult> {
    return this.userRepository.update(query, params)
  }
}

export default new userService(userRepository)
