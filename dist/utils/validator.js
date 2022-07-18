"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRegister = exports.ValidateLogin = void 0;
const joi_1 = __importDefault(require("joi"));
class ValidateLogin {
    constructor(email, password) {
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(8).required(),
        });
        return schema.validate({ email, password });
    }
}
exports.ValidateLogin = ValidateLogin;
class ValidateRegister {
    constructor(email, password) {
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(8).required(),
        });
        return schema.validate({ email, password });
    }
}
exports.ValidateRegister = ValidateRegister;
//# sourceMappingURL=validator.js.map