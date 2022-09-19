"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = __importDefault(require("../controller/messageController"));
const Router = express_1.default.Router();
Router.get('/get-message', messageController_1.default.getMessage);
Router.get('/getUser', messageController_1.default.getAllUser);
exports.default = Router;
//# sourceMappingURL=messageRouter.js.map