"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInfoRepository = exports.userRepository = void 0;
const User_1 = require("../entities/User");
const UserInfo_1 = __importDefault(require("../entities/UserInfo"));
const DataSource_1 = __importDefault(require("../lib/DataSource"));
exports.userRepository = DataSource_1.default.getRepository(User_1.User);
exports.userInfoRepository = DataSource_1.default.getRepository(UserInfo_1.default);
//# sourceMappingURL=repository.js.map