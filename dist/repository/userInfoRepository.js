"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserInfo_1 = __importDefault(require("../entities/UserInfo"));
const DataSource_1 = __importDefault(require("../lib/DataSource"));
class UserInfoRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        return await this.repository.save(data);
    }
    async insert(data) {
        return this.repository.createQueryBuilder().insert().values(data).returning('*').execute();
    }
    async findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async findOne(where, options) {
        return await this.repository.findOne(Object.assign({ where }, options));
    }
    async find(where, options) {
        return this.repository.find(Object.assign({ where }, options));
    }
    async updateById(id, user) {
        return await this.repository
            .createQueryBuilder()
            .update()
            .set(user)
            .where('id = :id', { id })
            .returning('*')
            .execute();
    }
    async delete(id) {
        await this.repository.delete(id);
    }
}
const repository = DataSource_1.default.getRepository(UserInfo_1.default);
exports.default = new UserInfoRepository(repository);
//# sourceMappingURL=userInfoRepository.js.map