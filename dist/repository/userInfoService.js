"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserInfo_1 = __importDefault(require("../entities/UserInfo"));
const DataSource_1 = __importDefault(require("../lib/DataSource"));
class UserInfoService {
    constructor() {
        this.repository = DataSource_1.default.getRepository(UserInfo_1.default);
    }
    async createUser(data) {
        return this.repository.save(data);
    }
    async getUser(id) {
        return this.repository.findOne({ where: { id } });
    }
    async getUsers() {
        return this.repository.find();
    }
    async updateUser(_id, user) {
        return this.repository.save(user);
    }
    async deleteUser(id) {
        await this.repository.delete(id);
    }
}
exports.default = new UserInfoService();
//# sourceMappingURL=userInfoService.js.map