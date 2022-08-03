import { Server } from 'socket.io';
import { Server as httpServer } from 'http';

const socketIo = (httpServer: httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3090',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('message', (msg) => {
      io.emit('message', msg);
    });
  });
};

export default socketIo;
