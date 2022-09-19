import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import userRepository from '../repository/userRepository';
import userService from '../service/userService';
import { MulterFile } from '../types/MulterType';

const upload = multer({ storage: multer.diskStorage({}) });

const Router = express.Router();

Router.post('/user', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const userId = req.session.userId as string;
    const file = req.file as MulterFile;

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

Router.get('/user', async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId as string;
    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
      select: ['email', 'id'],
    });
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

Router.post('/upload', upload.array('file'), async (_req: Request, _res: Response) => {
  // try {
  //   const file = req.files as MulterFiles;
  //   const uploads = await multipleUpload(file);
  //   console.log(uploads);
  // } catch (error) {
  //   const code = error.code || 500;
  //   return res.status(code).json({
  //     code: code,
  //     message: error.message,
  //   });
  // }
});

export default Router;
