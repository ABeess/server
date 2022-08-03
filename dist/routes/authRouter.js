"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const authService_1 = __importDefault(require("../service/authService"));
const Errors_1 = require("../lib/Errors");
const jwt_1 = __importDefault(require("../utils/jwt"));
const Router = express_1.default.Router();
Router.post('/register', async (req, res) => {
    try {
        await authService_1.default.register(req.body);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            code: http_status_codes_1.StatusCodes.CREATED,
            message: 'User created',
        });
    }
    catch (error) {
        const code = error.code || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(code).json({
            code: code,
            message: error.message,
        });
    }
});
Router.post('/login', async (req, res) => {
    try {
        const user = await authService_1.default.login(req.body);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                code: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                message: 'Email or password is incorrect',
            });
        }
        const accessToken = jwt_1.default.generateAccessToken(user);
        const refreshToken = jwt_1.default.generateRefreshToken(user);
        req.session.userId = user.id || undefined;
        req.session.refreshToken = refreshToken;
        const { password } = user, other = __rest(user, ["password"]);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            code: http_status_codes_1.StatusCodes.OK,
            message: 'User logged in',
            user: other,
            accessToken,
        });
    }
    catch (error) {
        const code = error.code || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(code).json({
            code: code,
            message: error.message,
        });
    }
});
Router.post('/logout', async (req, res) => {
    try {
        res.clearCookie('connect.sid');
        req.session.destroy((err) => {
            if (err) {
                throw new Errors_1.UnauthorizedError(err.message);
            }
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            code: http_status_codes_1.StatusCodes.OK,
            message: 'User logged out',
        });
    }
    catch (error) {
        const code = error.code || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: code,
            message: error.message,
        });
    }
});
Router.post('/refresh-token', async (req, res) => {
    try {
        const refreshToken = req.session.refreshToken;
        if (!refreshToken) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                code: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                message: 'You are not authenticated',
            });
        }
        const { newAccessToken, newRefreshToken } = await authService_1.default.refreshToken(refreshToken);
        req.session.refreshToken = newRefreshToken;
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            code: http_status_codes_1.StatusCodes.OK,
            message: 'Token refreshed',
            accessToken: newAccessToken,
        });
    }
    catch (error) {
        const code = error.code || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(code).json({
            code: code,
            message: error.message,
        });
    }
});
exports.default = Router;
//# sourceMappingURL=authRouter.js.map