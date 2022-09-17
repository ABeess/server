"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const socketIo = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
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
exports.default = socketIo;
//# sourceMappingURL=socket.js.map