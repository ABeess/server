"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const repository_1 = require("../utils/repository");
class UserRepository {
    async findOne(params, query) {
        return repository_1.userRepository.findOne({
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
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=use.repository.js.map