"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./userRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const Router = express_1.default.Router();
Router.use('/auth', authRouter_1.default);
Router.use('/users', userRouter_1.default);
exports.default = Router;
//# sourceMappingURL=baseApi.js.map