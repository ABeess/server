"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const User_1 = require("../entities/User");
const DataSource_1 = __importDefault(require("../lib/DataSource"));
exports.userRepository = DataSource_1.default.getRepository(User_1.User);
//# sourceMappingURL=repository.js.map