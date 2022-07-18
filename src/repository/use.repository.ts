import { User } from '../entities/User'
import { userRepository } from '../utils/repository'

export class UserRepository {
  async findOne(params: string, query: string): Promise<User | null> {
    return userRepository.findOne({
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
}
