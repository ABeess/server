import { Repository } from 'typeorm'
import UserInfo from '../entities/UserInfo'
import { userInfoRepository } from '../utils/repository'

class UserInfoService {
  constructor(private userInfoRepository: Repository<UserInfo>) {}

  async createUser(data: UserInfo): Promise<UserInfo> {
    return this.userInfoRepository.save(data)
  }

  async getUser(id: string): Promise<UserInfo | null> {
    return this.userInfoRepository.findOne({ where: { id } })
  }

  async getUsers(): Promise<UserInfo[]> {
    return this.userInfoRepository.find()
  }

  async updateUser(id: string, user: UserInfo): Promise<UserInfo> {
    return this.userInfoRepository.save(user)
  }

  async deleteUser(id: string): Promise<void> {
    await this.userInfoRepository.delete(id)
  }
}

export default new UserInfoService(userInfoRepository)
