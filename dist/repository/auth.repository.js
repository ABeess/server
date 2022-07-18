"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../utils/repository");
class AuthRepository {
    async registerRepository(registerInput) {
        const { email, password } = registerInput;
        const user = repository_1.userRepository.create({ email, password });
        return repository_1.userRepository.save(user);
    }
}
exports.default = AuthRepository;
//# sourceMappingURL=auth.repository.js.map