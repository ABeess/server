"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
    async findOne(_a) {
        var { where } = _a, other = __rest(_a, ["where"]);
        return await this.repository.findOne(Object.assign({ where }, other));
    }
    async findOneBy(_a) {
        var other = __rest(_a, []);
        return await this.repository.findOneBy(other);
    }
    async find(_a) {
        var { where } = _a, other = __rest(_a, ["where"]);
        return this.repository.find(Object.assign({ where }, other));
    }
    async update(query, partial) {
        return this.repository.update(query, partial);
    }
    createQueryBuilder() {
        return this.repository.createQueryBuilder();
    }
}
const repository = DataSource_1.default.getRepository(User_1.User);
exports.default = new UserRepository(repository);
//# sourceMappingURL=userRepository.js.map