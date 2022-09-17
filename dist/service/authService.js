"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Errors_1 = require("../lib/Errors");
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const redis_1 = __importDefault(require("../utils/redis"));
const validator_1 = require("../utils/validator");
class AuthService {
    async register(registerInput) {
        const { email, password, code } = registerInput;
        const validate = new validator_1.ValidateLogin(email, password);
        if (validate && validate.error) {
            throw new Errors_1.UnauthorizedError(validate.error.message);
        }
        const existingUser = await userRepository_1.default.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            throw new Errors_1.ConflictError('Email already exists on the system');
        }
        const hashedPassword = await argon2_1.default.hash(password);
        const newUser = userRepository_1.default.create(Object.assign(Object.assign({}, registerInput), { email, password: hashedPassword }));
        return newUser;
    }
    async login(loginInput) {
        const { email, password } = loginInput;
        const validate = new validator_1.ValidateLogin(email, password);
        if (validate && validate.error) {
            throw new Errors_1.UnauthorizedError(validate.error.message);
        }
        const existingUser = await userRepository_1.default.findOne({ email }, {
            relations: ['userInfo'],
        });
        if (!existingUser) {
            throw new Errors_1.UnauthorizedError('Email or password is incorrect');
        }
        const validPassword = await argon2_1.default.verify(existingUser.password, password);
        if (!validPassword) {
            throw new Errors_1.UnauthorizedError('Email or password is incorrect');
        }
        await redis_1.default.set(`token:${existingUser.id}`, 1);
        return existingUser;
    }
    async refreshToken(token) {
        if (!token) {
            throw new Errors_1.UnauthorizedError('No token provided');
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESHTOKEN_SECRET);
        if (!payload) {
            throw new Errors_1.UnauthorizedError('Invalid token');
        }
        const existingUser = await userRepository_1.default.findOne({ id: payload.id });
        const existToken = await redis_1.default.exists(`token:${payload.id}`);
        if (existToken) {
            await redis_1.default.incrby(`token:${payload.id}`, 1);
        }
        if (!existingUser) {
            throw new Errors_1.UnauthorizedError('You are not authenticated');
        }
        const newAccessToken = jwt_1.default.generateAccessToken(existingUser);
        const newRefreshToken = jwt_1.default.generateRefreshToken(existingUser);
        return {
            newAccessToken,
            newRefreshToken,
        };
    }
    async mailerService(email) {
        const existingUser = await userRepository_1.default.findOne({
            email,
        });
        if (existingUser) {
            throw new Errors_1.ConflictError('Email already exists on the system');
        }
    }
}
exports.default = new AuthService();
//# sourceMappingURL=authService.js.map