"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Errors_1 = require("../lib/Errors");
const auth_repository_1 = __importDefault(require("../repository/auth.repository"));
const use_repository_1 = require("../repository/use.repository");
const jwt_1 = require("../utils/jwt");
const validator_1 = require("../utils/validator");
const { registerRepository } = new auth_repository_1.default();
const { genarateAccessToken, genarateRefreshToken } = new jwt_1.JWTManager();
const { findOne } = new use_repository_1.UserRepository();
class AuthService {
    async register(registerInput) {
        const { email, password } = registerInput;
        const validate = new validator_1.ValidateLogin(email, password);
        if (validate && validate.error) {
            throw new Errors_1.UnauthorizedError(validate.error.message);
        }
        const existingUser = await findOne('email', email);
        if (existingUser) {
            throw new Errors_1.ConflictError('Email already exists');
        }
        const hashedPassword = await argon2_1.default.hash(password);
        const newUser = registerRepository({ email, password: hashedPassword });
        return newUser;
    }
    async login(loginInput) {
        const { email, password } = loginInput;
        const existingUser = await findOne('email', email);
        if (!existingUser) {
            throw new Errors_1.UnauthorizedError('Email or password is incorrect');
        }
        const validPassword = await argon2_1.default.verify(existingUser.password, password);
        if (!validPassword) {
            throw new Errors_1.UnauthorizedError('Email or password is incorrect');
        }
        return existingUser;
    }
    async authRefreshToken(token) {
        if (!token) {
            throw new Errors_1.UnauthorizedError('No token provided');
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESHTOKEN_SECRET);
        if (!payload) {
            throw new Errors_1.UnauthorizedError('Invalid token');
        }
        const existingUser = await findOne('id', payload.id);
        if (!existingUser) {
            throw new Errors_1.UnauthorizedError('You are not authenticated');
        }
        const newAccessToken = genarateAccessToken(existingUser);
        const newRefreshToken = genarateRefreshToken(existingUser);
        return {
            newAccessToken,
            newRefreshToken,
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map