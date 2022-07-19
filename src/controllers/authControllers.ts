import argon2 from 'argon2'
import JWT, { JwtPayload, Secret } from 'jsonwebtoken'
import { User } from '../entities/User'
import { ConflictError, UnauthorizedError } from '../lib/Errors'
import AuthService from '../service/authService'
import UserService from '../service/userService'
import { LoginInput, RegisterInput } from '../types/InputType'
import JWTManager from '../utils/jwt'
import { ValidateLogin } from '../utils/validator'

type ReturnToken = {
  newAccessToken: string
  newRefreshToken: string
}

class AuthControllers {
  async register(registerInput: RegisterInput): Promise<User | null> {
    const { email, password } = registerInput
    const validate: any = new ValidateLogin(email, password)

    if (validate && validate.error) {
      throw new UnauthorizedError(validate.error.message)
    }

    const existingUser = await UserService.findOne('email', email)

    if (existingUser) {
      throw new ConflictError('Email already exists')
    }

    const hashedPassword = await argon2.hash(password)

    const newUser = AuthService.register({ email, password: hashedPassword })

    return newUser
  }
  // ----------------------------------------------------------------------------------
  async login(loginInput: LoginInput): Promise<User | null> {
    const { email, password } = loginInput
    // const validate: any = new ValidateLogin(email, password)

    // if (validate && validate.error) {
    //   throw new UnauthorizedError(validate.error.message)
    // }

    const existingUser = await UserService.findOne('email', email)

    if (!existingUser) {
      throw new UnauthorizedError('Email or password is incorrect')
    }

    const validPassword = await argon2.verify(existingUser.password, password)

    if (!validPassword) {
      throw new UnauthorizedError('Email or password is incorrect')
    }
    return existingUser
  }
  // ----------------------------------------------------------------------------------
  async refreshToken(token: string): Promise<ReturnToken> {
    if (!token) {
      throw new UnauthorizedError('No token provided')
    }
    const payload = JWT.verify(token, process.env.JWT_REFRESHTOKEN_SECRET as Secret) as JwtPayload

    if (!payload) {
      throw new UnauthorizedError('Invalid token')
    }

    const existingUser = await UserService.findOne('id', payload.id)

    if (!existingUser) {
      throw new UnauthorizedError('You are not authenticated')
    }

    const newAccessToken = JWTManager.genarateAccessToken(existingUser)

    const newRefreshToken = JWTManager.genarateRefreshToken(existingUser)

    return {
      newAccessToken,
      newRefreshToken,
    }
  }
}

export default new AuthControllers()
