"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const DataSource_1 = __importDefault(require("../lib/DataSource"));
class AuthRepository {
    constructor() {
        this.repository = DataSource_1.default.getRepository(User_1.User);
    }
    async register(registerInput) {
        const { email, password } = registerInput;
        const user = this.repository.create({ email, password });
        return this.repository.save(user);
    }
}
exports.default = new AuthRepository();
//# sourceMappingURL=authRepository.js.map