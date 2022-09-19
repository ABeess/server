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
const UserRoom_1 = require("../entities/UserRoom");
const DataSource_1 = __importDefault(require("../lib/DataSource"));
class UserRoomRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        return await this.repository.save(data);
    }
    async find(_a) {
        var { where } = _a, other = __rest(_a, ["where"]);
        return await this.repository.find(Object.assign({ where }, other));
    }
}
const repository = DataSource_1.default.getRepository(UserRoom_1.UserRoom);
exports.default = new UserRoomRepository(repository);
//# sourceMappingURL=userRoomRepository.js.map