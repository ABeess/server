import { User } from '../entities/User'
import AppDataSource from '../lib/DataSource'

export const userRepository = AppDataSource.getRepository(User)
