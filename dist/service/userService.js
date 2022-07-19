"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../utils/repository");
class userService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findOne(params, query) {
        return this.userRepository.findOne({
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
        return this.userRepository.update(query, params);
    }
}
exports.default = new userService(repository_1.userRepository);
//# sourceMappingURL=userService.js.map