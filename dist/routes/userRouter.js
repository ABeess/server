"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const userService_1 = __importDefault(require("../service/userService"));
const Router = express_1.default.Router();
Router.post('/user', async (req, res) => {
    try {
        const body = req.body;
        const userId = req.session.userId;
        const userInfo = await userService_1.default.createAndUpdate(body, userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            code: http_status_codes_1.StatusCodes.OK,
            message: 'User info updated',
            data: userInfo,
        });
    }
    catch (error) {
        console.log(error);
        const code = (error === null || error === void 0 ? void 0 : error.code) || 500;
        return res.status(code).json({
            code: code,
            message: error.message,
        });
    }
});
Router.get('/user', async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await userRepository_1.default.findOne({ id: userId }, {
            select: ['id', 'email'],
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            code: http_status_codes_1.StatusCodes.OK,
            message: 'User found',
            user,
        });
    }
    catch (error) {
        const code = error.code || 500;
        return res.status(code).json({
            code: code,
            message: error.message,
        });
    }
});
exports.default = Router;
//# sourceMappingURL=userRouter.js.map