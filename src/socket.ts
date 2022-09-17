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
    console.log(socket);
    socket.on('message:1', (msg) => {
      console.log(msg);
      io.emit('message:1', msg);
    });
  });
};

export default socketIo;
