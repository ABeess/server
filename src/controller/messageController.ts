import { Request, Response } from 'express';
import { In, Not } from 'typeorm';
import MessageRepository from '../repository/messageRepository';
import userRepository from '../repository/userRepository';

// interface IQuery {
//   id: string;
//   type: string;
// }

class MessageController {
  async getMessage(req: Request, res: Response) {
    try {
      const { sender, receive } = req.query;

      const message = await MessageRepository.find({
        where: {
          sender: {
            id: In([sender, receive]),
          },
          receive: In([sender, receive]),
        },
        relations: {
          sender: true,
        },
      });

      return res.status(200).json({
        code: 200,
        message: 'Get Chat',
        data: message,
      });
    } catch (error) {
      return res.status(500).json({ code: 500, message: 'interval server' });
    }
  }
  async getAllUser(req: Request, res: Response) {
    try {
      const { type, id } = req.query;

      const newId = id as string;

      const user = await userRepository.find({
        where: {
          ...(type === 'ne' && {
            id: Not(newId),
          }),
        },
      });
      return res.status(200).json({
        code: 200,
        message: 'get user',
        user,
      });
    } catch (error) {
      return res.status(500).json({ code: 500, message: 'interval server' });
    }
  }
}

export default new MessageController();
