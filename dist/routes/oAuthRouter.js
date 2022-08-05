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
const passport_1 = __importDefault(require("../lib/passport"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const Router = express_1.default.Router();
Router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
Router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login', successRedirect: 'http://localhost:3090/auth/login' }));
Router.get('/auth/github', passport_1.default.authenticate('github', { scope: ['profile', 'user:email'] }));
Router.get('/github/callback', passport_1.default.authenticate('github', { failureRedirect: '/login', successRedirect: 'http://localhost:3090/auth/login' }));
Router.get('/oauth-user', (req, res) => {
    try {
        const response = req.user;
        if (!response) {
            return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
                code: http_status_codes_1.StatusCodes.NO_CONTENT,
                message: 'User is logged out',
            });
        }
        if (response.code) {
            return res.status(response.code).json({
                code: response.code,
                message: response.message,
            });
        }
        else if (response) {
            const accessToken = jwt_1.default.generateAccessToken(response);
            const refreshToken = jwt_1.default.generateRefreshToken(response);
            req.session.userId = response.id || undefined;
            req.session.refreshToken = refreshToken;
            const { password } = response, user = __rest(response, ["password"]);
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                code: http_status_codes_1.StatusCodes.OK,
                message: 'Success',
                user: user,
                accessToken,
            });
        }
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            code: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            message: 'User not found',
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message,
            code: 500,
        });
    }
});
exports.default = Router;
//# sourceMappingURL=oAuthRouter.js.map