import argon2 from 'argon2'
import JWT, { JwtPayload, Secret } from 'jsonwebtoken'
import { User } from '../entities/User'
import { ConflictError, UnauthorizedError } from '../lib/Errors'
import AuthRepository from '../repository/auth.repository'
import { UserRepository } from '../repository/use.repository'
import { LoginInput, RegisterInput } from '../types/InputType'
import { JWTManager } from '../utils/jwt'
import { ValidateLogin } from '../utils/validator'

const { registerRepository } = new AuthRepository()
const { genarateAccessToken, genarateRefreshToken } = new JWTManager()
const { findOne } = new UserRepository()

export class AuthService {
  async register(registerInput: RegisterInput): Promise<User | null> {
    const { email, password } = registerInput
    const validate: any = new ValidateLogin(email, password)

    if (validate && validate.error) {
      throw new UnauthorizedError(validate.error.message)
    }

    const existingUser = await findOne('email', email)

    if (existingUser) {
      throw new ConflictError('Email already exists')
    }

    const hashedPassword = await argon2.hash(password)

    const newUser = registerRepository({ email, password: hashedPassword })

    return newUser
  }
  async login(loginInput: LoginInput): Promise<User | null> {
    const { email, password } = loginInput
    // const validate: any = new ValidateLogin(email, password)

    // if (validate && validate.error) {
    //   throw new UnauthorizedError(validate.error.message)
    // }

    const existingUser = await findOne('email', email)

    if (!existingUser) {
      throw new UnauthorizedError('Email or password is incorrect')
    }

    const validPassword = await argon2.verify(existingUser.password, password)

    if (!validPassword) {
      throw new UnauthorizedError('Email or password is incorrect')
    }
    return existingUser
  }
  async authRefreshToken(token: string): Promise<{
    newAccessToken: string
    newRefreshToken: string
  }> {
    if (!token) {
      throw new UnauthorizedError('No token provided')
    }
    const payload = JWT.verify(token, process.env.JWT_REFRESHTOKEN_SECRET as Secret) as JwtPayload

    if (!payload) {
      throw new UnauthorizedError('Invalid token')
    }

    const existingUser = await findOne('id', payload.id)

    if (!existingUser) {
      throw new UnauthorizedError('You are not authenticated')
    }

    const newAccessToken = genarateAccessToken(existingUser)

    const newRefreshToken = genarateRefreshToken(existingUser)

    return {
      newAccessToken,
      newRefreshToken,
    }
  }
}
