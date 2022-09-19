import argon2 from 'argon2';
import JWT, { JwtPayload, Secret } from 'jsonwebtoken';
import { User } from '../entities/User';
import { ConflictError, UnauthorizedError } from '../lib/Errors';
import UserRepository from '../repository/userRepository';
import { LoginInput, RegisterInput } from '../types/InputType';
import { ValidatorResponse } from '../types/ValidatorResponse';
import JWTManager from '../utils/jwt';
import redis from '../utils/redis';
import { ValidateLogin } from '../utils/validator';

type ReturnToken = {
  newAccessToken: string;
  newRefreshToken: string;
};

class AuthService {
  async register(registerInput: RegisterInput): Promise<User | null> {
    const { email, password } = registerInput;
    const validate: any = new ValidateLogin(email, password);

    if (validate && validate.error) {
      throw new UnauthorizedError(validate.error.message);
    }

    const existingUser = await UserRepository.findOne({ where: { email } });
    console.log(existingUser);

    if (existingUser) {
      throw new ConflictError('Email already exists on the system');
    }

    // const verifyCode = (await redis.get(`email:${email}`)) as string;

    // console.log(verifyCode);
    // console.log(code);

    // if (!code) {
    //   throw new UnauthorizedError('Code is required');
    // }

    // if (verifyCode !== code) {
    //   throw new UnauthorizedError('Invalid code');
    // }

    const hashedPassword = await argon2.hash(password);

    const newUser = UserRepository.create({ ...registerInput, email, password: hashedPassword });

    return newUser;
  }
  // ----------------------------------------------------------------------------------
  async login(loginInput: LoginInput): Promise<User | null> {
    const { email, password } = loginInput;
    const validate = new ValidateLogin(email, password) as ValidatorResponse;

    console.log(email, password);

    if (validate && validate.error) {
      throw new UnauthorizedError(validate.error.message);
    }
    // const existingUser = await UserRepository.findOne({ where: { email } });

    const existingUser = await UserRepository.createQueryBuilder()
      .where('email = :email', { email })
      .addSelect('password')
      .getOne();
    console.log(existingUser);

    if (!existingUser) {
      throw new UnauthorizedError('Email or password is incorrect');
    }

    const validPassword = await argon2.verify(existingUser.password, password);

    if (!validPassword) {
      throw new UnauthorizedError('Email or password is incorrect');
    }

    return existingUser;
  }
  // ----------------------------------------------------------------------------------
  async refreshToken(token: string): Promise<ReturnToken> {
    if (!token) {
      throw new UnauthorizedError('No token provided');
    }
    const payload = JWT.verify(token, process.env.JWT_REFRESHTOKEN_SECRET as Secret) as JwtPayload;

    if (!payload) {
      throw new UnauthorizedError('Invalid token');
    }

    const existingUser = await UserRepository.findOne({ where: { id: payload.sub } });

    const existToken = await redis.exists(`token:${payload.sub}`);

    if (existToken) {
      await redis.incrby(`token:${payload.sub}`, 1);
    }

    if (!existingUser) {
      throw new UnauthorizedError('You are not authenticated');
    }

    const newAccessToken = JWTManager.generateAccessToken(existingUser);

    const newRefreshToken = JWTManager.generateRefreshToken(existingUser);

    return {
      newAccessToken,
      newRefreshToken,
    };
  }

  async mailerService(email: string): Promise<void> {
    const existingUser = await UserRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictError('Email already exists on the system');
    }
  }
}

export default new AuthService();
