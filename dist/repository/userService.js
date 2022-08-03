"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const DataSource_1 = __importDefault(require("../lib/DataSource"));
class userService {
    constructor() {
        this.repository = DataSource_1.default.getRepository(User_1.User);
    }
    async findOne(params, query) {
        return this.repository.findOne({
            relations: ['userInfo'],
            where: { [params]: query },
            select: {
                id: true,
                email: true,
                password: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async update(query, params) {
        return this.repository.update(query, params);
    }
}
exports.default = new userService();
//# sourceMappingURL=userService.js.map