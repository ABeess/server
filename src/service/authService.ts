import { Repository } from 'typeorm'
import { User } from '../entities/User'
import { RegisterInput } from '../types/InputType'
import { userRepository } from '../utils/repository'

class AuthService {
  constructor(private authRepository: Repository<User>) {}
  async register(registerInput: RegisterInput): Promise<User | null> {
    const { email, password } = registerInput
    const user = this.authRepository.create({ email, password })
    return this.authRepository.save(user)
  }
}

export default new AuthService(userRepository)
