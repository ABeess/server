"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const DataSource_1 = __importDefault(require("../lib/DataSource"));
class UserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        return this.repository.save(data);
    }
    async findOne(where, options) {
        return await this.repository.findOne(Object.assign({ where }, options));
    }
    async find(where, options) {
        return this.repository.find(Object.assign({ where }, options));
    }
    async update(query, partial) {
        return this.repository.update(query, partial);
    }
}
const repository = DataSource_1.default.getRepository(User_1.User);
exports.default = new UserRepository(repository);
//# sourceMappingURL=userRepository.js.map