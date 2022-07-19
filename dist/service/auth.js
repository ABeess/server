"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../utils/repository");
class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async registerRepository(registerInput) {
        const { email, password } = registerInput;
        const user = this.authRepository.create({ email, password });
        return this.authRepository.save(user);
    }
}
exports.default = new AuthService(repository_1.userRepository);
//# sourceMappingURL=auth.js.map