"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const userRoomRepository_1 = __importDefault(require("./repository/userRoomRepository"));
const messageRepository_1 = __importDefault(require("./repository/messageRepository"));
const socketIo = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: 'http://localhost:3090',
            credentials: true,
        },
    });
    io.on('connection', (socket) => {
        socket.on('private-chat', async ({ sender, receive, message }) => {
            try {
                console.log(sender.id);
                const newMessage = await messageRepository_1.default.create({
                    sender,
                    receive,
                    message,
                });
                io.to([sender.id, receive]).emit('private-chat', newMessage);
            }
            catch (error) {
                console.log(error);
            }
        });
        socket.on('join-chat-room', ({ sender, receive }) => {
            console.log(sender);
            socket.join([sender, receive]);
        });
        socket.on('created-room', ({ user_id }) => {
            try {
                userRoomRepository_1.default.create({ user_id, room: socket.id });
            }
            catch (error) {
                console.log(error);
            }
        });
        socket.on('login', async (user_id) => {
            try {
                const userRoom = await userRoomRepository_1.default.find({
                    where: {
                        user_id,
                    },
                });
                const room = userRoom.map((user) => user.room);
                socket.join(room);
            }
            catch (error) {
                console.log(error);
            }
        });
    });
};
exports.default = socketIo;
//# sourceMappingURL=socket.js.map