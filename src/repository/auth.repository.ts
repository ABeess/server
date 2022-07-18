import { User } from '../entities/User'
import { RegisterInput } from '../types/InputType'
import { userRepository } from '../utils/repository'

class AuthRepository {
  async registerRepository(registerInput: RegisterInput): Promise<User | null> {
    const { email, password } = registerInput
    const user = userRepository.create({ email, password })
    return userRepository.save(user)
  }
}

export default AuthRepository
