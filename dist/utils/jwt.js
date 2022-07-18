"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTManager = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTManager {
    genarateAccessToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_ACCESSTOKEN_SECRET, { expiresIn: '10m' });
    }
    genarateRefreshToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_REFRESHTOKEN_SECRET, { expiresIn: '30d' });
    }
}
exports.JWTManager = JWTManager;
//# sourceMappingURL=jwt.js.map