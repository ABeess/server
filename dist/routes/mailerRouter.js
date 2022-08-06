"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
Router.post('send-mail', (req, res) => {
    res.send('send-mail');
});
exports.default = Router;
//# sourceMappingURL=mailerRouter.js.map