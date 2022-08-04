import express from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repository/userRepository';
import userService from '../service/userService';
import multer from 'multer';

const upload = multer({ storage: multer.diskStorage({}) });

const Router = express.Router();

Router.post('/user', upload.single('file'), async (req, res) => {
  try {
    const body = req.body;

    const userId = req.session.userId as number;
    const file = req.file;

    const userInfo = await userService.createAndUpdate({ body, userId, file });

    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'User info updated',
      data: userInfo,
    });
  } catch (error) {
    console.log(error);
    const code = error?.code || 500;
    return res.status(code).json({
      code: code,
      message: error.message,
    });
  }
});

Router.get('/user', async (req, res) => {
  try {
    const userId = req.session.userId as number;
    const user = await userRepository.findOne(
      { id: userId },
      {
        select: ['id', 'email'],
      }
    );
    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'User found',
      user,
    });
  } catch (error) {
    const code = error.code || 500;
    return res.status(code).json({
      code: code,
      message: error.message,
    });
  }
});

export default Router;
