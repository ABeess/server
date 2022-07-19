"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../utils/repository");
class UserInfoService {
    constructor(userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }
    async createUser(data) {
        return this.userInfoRepository.save(data);
    }
    async getUser(id) {
        return this.userInfoRepository.findOne({ where: { id } });
    }
    async getUsers() {
        return this.userInfoRepository.find();
    }
    async updateUser(id, user) {
        return this.userInfoRepository.save(user);
    }
    async deleteUser(id) {
        await this.userInfoRepository.delete(id);
    }
}
exports.default = new UserInfoService(repository_1.userInfoRepository);
//# sourceMappingURL=userInfoService.js.map