"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("../lib/Errors");
const userInfoRepository_1 = __importDefault(require("../repository/userInfoRepository"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
class UserService {
    async createAndUpdate(body, userId) {
        if (!userId) {
            throw new Errors_1.BadRequestError('Missing the parameter');
        }
        const existingUser = await userRepository_1.default.findOne({ id: userId }, {
            relations: ['userInfo'],
        });
        if (!existingUser) {
            throw new Errors_1.NotFoundError('User dose not exist on the system');
        }
        const existingUserInfo = existingUser.userInfo;
        if (existingUserInfo) {
            const newUserInfo = await userInfoRepository_1.default.update(existingUserInfo.id, body);
            return newUserInfo.raw[0];
        }
        const newUserInfo = await userInfoRepository_1.default.insert(Object.assign(Object.assign({}, body), { user: existingUser }));
        console.log(newUserInfo);
        return newUserInfo.raw[0];
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map