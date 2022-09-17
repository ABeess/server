import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UnauthorizedError } from '../lib/Errors';
import AuthService from '../service/authService';
import JWTManager from '../utils/jwt';

const Router = express.Router();

Router.post('/register', async (req: Request, res: Response) => {
  try {
    await AuthService.register(req.body);
    return res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      message: 'User created',
    });
  } catch (error) {
    const code = error.code || StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(code).json({
      code: code,
      message: error.message,
    });
  }
});

Router.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await AuthService.login(req.body);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        code: StatusCodes.UNAUTHORIZED,
        message: 'Email or password is incorrect',
      });
    }
    const accessToken = JWTManager.generateAccessToken(user);
    const refreshToken = JWTManager.generateRefreshToken(user);

    req.session.userId = user.id || undefined;
    req.session.refreshToken = refreshToken;

    const { password, ...other } = user;

    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'User logged in',
      user: other,
      accessToken,
    });
  } catch (error) {
    const code = error.code || StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(code).json({
      code: code,
      message: error.message,
    });
  }
});

Router.post('/logout', async (req: Request, res: Response) => {
  try {
    res.clearCookie('connect.sid');
    req.session.destroy((err) => {
      if (err) {
        throw new UnauthorizedError(err.message);
      }
    });
    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'User logged out',
    });
  } catch (error) {
    const code = error.code || StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: code,
      message: error.message,
    });
  }
});

Router.post('/refresh-token', async (req: Request, res: Response) => {
  try {
    const refreshToken = req.session.refreshToken;

    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        code: StatusCodes.UNAUTHORIZED,
        message: 'You are not authenticated',
      });
    }

    const { newAccessToken, newRefreshToken } = await AuthService.refreshToken(refreshToken);

    req.session.refreshToken = newRefreshToken;

    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'Token refreshed',
      accessToken: newAccessToken,
    });
  } catch (error) {
    const code = error.code || StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(code).json({
      code: code,
      message: error.message,
    });
  }
});

export default Router;
