"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleapis_1 = require("googleapis");
const http_status_codes_1 = require("http-status-codes");
const redis_1 = __importDefault(require("../utils/redis"));
const transporter_1 = __importDefault(require("../utils/transporter"));
const Router = express_1.default.Router();
Router.post('/send-mail', async (req, res) => {
    const { email } = req.body;
    try {
        const oauth2Client = new googleapis_1.google.auth.OAuth2({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        });
        oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_API_REFRESHTOKEN,
        });
        const { token } = await oauth2Client.getAccessToken();
        if (!token) {
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({
                code: http_status_codes_1.StatusCodes.FORBIDDEN,
                message: 'No token',
            });
        }
        const code = Math.floor(Math.random() * 1000000);
        const html = `
      <h1>Hello ${email}</h1>
      <p>Your code is ${code}</p>
    `;
        const transporter = new transporter_1.default(token).transporter;
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Confirm your email',
            html: html,
        });
        await redis_1.default.set(`email:${email}`, code, 'EX', 60 * 10);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            code: http_status_codes_1.StatusCodes.OK,
            message: 'Mail sent',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
});
exports.default = Router;
//# sourceMappingURL=mailRouter.js.map