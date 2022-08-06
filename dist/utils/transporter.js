"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class MyTransporter {
    constructor(token) {
        this.transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            service: 'Gmail',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USER,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_API_REFRESHTOKEN,
                accessToken: token,
            },
        });
    }
}
exports.default = MyTransporter;
//# sourceMappingURL=transporter.js.map