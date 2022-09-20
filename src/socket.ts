import { Server } from 'socket.io';
import { Server as httpServer } from 'http';
import UserRoomRepository from './repository/userRoomRepository';
import { SocketChat } from './types';
// import { isEmpty } from 'lodash';
import MessageRepository from './repository/messageRepository';
// import userRepository from './repository/userRepository';

const socketIo = (httpServer: httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ['http://localhost:3090', process.env.FORNT_END_CORDS as string],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('private-chat', async ({ sender, receive, message }: SocketChat) => {
      try {
        console.log(sender.id);
        const newMessage = await MessageRepository.create({
          sender,
          receive,
          message,
        });
        // socket.emit('private-chat', { newMessage, room: socket.rooms });
        io.to([sender.id, receive]).emit('private-chat', newMessage);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('join-chat-room', ({ sender, receive }: { sender: string; receive: string }) => {
      console.log(sender);
      socket.join([sender, receive]);
    });

    socket.on('created-room', ({ user_id }: { user_id: string }) => {
      try {
        UserRoomRepository.create({ user_id, room: socket.id });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('login', async (user_id: string) => {
      try {
        const userRoom = await UserRoomRepository.find({
          where: {
            user_id,
          },
        });
        const room = userRoom.map((user) => user.room);
        socket.join(room);
      } catch (error) {
        console.log(error);
      }
    });
  });
};

export default socketIo;
