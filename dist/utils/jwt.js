"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTManager {
    generateAccessToken(user) {
        return jsonwebtoken_1.default.sign({ sub: user.id }, process.env.JWT_ACCESSTOKEN_SECRET, { expiresIn: '10m' });
    }
    generateRefreshToken(user) {
        return jsonwebtoken_1.default.sign({ sub: user.id }, process.env.JWT_REFRESHTOKEN_SECRET, { expiresIn: '30d' });
    }
}
exports.default = new JWTManager();
//# sourceMappingURL=jwt.js.map