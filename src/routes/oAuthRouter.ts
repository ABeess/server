import express from 'express';
import { StatusCodes } from 'http-status-codes';
import passport from '../lib/passport';
import { IOAuthResponse } from '../types/responseType';
import JWTManager from '../utils/jwt';

const Router = express.Router();

Router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

Router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', successRedirect: 'http://localhost:3090/auth/login' })
);

Router.get('/auth/github', passport.authenticate('github', { scope: ['profile', 'user:email'] }));

Router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', successRedirect: 'http://localhost:3090/auth/login' })
);

Router.get('/oauth-user', (req, res) => {
  try {
    const response = req.user as IOAuthResponse;

    if (!response) {
      return res.status(StatusCodes.NO_CONTENT).json({
        code: StatusCodes.NO_CONTENT,
        message: 'User is logged out',
      });
    }
    if (response.code) {
      return res.status(response.code).json({
        code: response.code,
        message: response.message,
      });
    } else if (response) {
      const accessToken = JWTManager.generateAccessToken(response);
      const refreshToken = JWTManager.generateRefreshToken(response);
      req.session.userId = response.id || undefined;
      req.session.refreshToken = refreshToken;
      const { password, ...user } = response;
      return res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        message: 'Success',
        user: user,
        accessToken,
      });
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({
      code: StatusCodes.UNAUTHORIZED,
      message: 'User not found',
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      code: 500,
    });
  }
});

export default Router;
