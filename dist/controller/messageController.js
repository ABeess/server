"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const messageRepository_1 = __importDefault(require("../repository/messageRepository"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
class MessageController {
    async getMessage(req, res) {
        try {
            const { sender, receive } = req.query;
            const message = await messageRepository_1.default.find({
                where: {
                    sender: {
                        id: (0, typeorm_1.In)([sender, receive]),
                    },
                    receive: (0, typeorm_1.In)([sender, receive]),
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
        }
        catch (error) {
            return res.status(500).json({ code: 500, message: 'interval server' });
        }
    }
    async getAllUser(req, res) {
        try {
            const { type, id } = req.query;
            const newId = id;
            const user = await userRepository_1.default.find({
                where: Object.assign({}, (type === 'ne' && {
                    id: (0, typeorm_1.Not)(newId),
                })),
            });
            return res.status(200).json({
                code: 200,
                message: 'get user',
                user,
            });
        }
        catch (error) {
            return res.status(500).json({ code: 500, message: 'interval server' });
        }
    }
}
exports.default = new MessageController();
//# sourceMappingURL=messageController.js.map