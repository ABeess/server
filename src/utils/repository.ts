import { User } from '../entities/User'
import UserInfo from '../entities/UserInfo'
import AppDataSource from '../lib/DataSource'

export const userRepository = AppDataSource.getRepository(User)

export const userInfoRepository = AppDataSource.getRepository(UserInfo)
