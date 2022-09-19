"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./userRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const oAuthRouter_1 = __importDefault(require("./oAuthRouter"));
const mailRouter_1 = __importDefault(require("./mailRouter"));
const messageRouter_1 = __importDefault(require("./messageRouter"));
const Router = express_1.default.Router();
Router.use('/auth', authRouter_1.default);
Router.use('/', userRouter_1.default);
Router.use('/', oAuthRouter_1.default);
Router.use('/', mailRouter_1.default);
Router.use('/message', messageRouter_1.default);
exports.default = Router;
//# sourceMappingURL=baseApi.js.map