"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: '34.143.196.201',
    username: 'abees',
    password: 'abees',
    entities: ['dist/entities/*.js'],
    synchronize: true,
    ssl: false,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
exports.default = AppDataSource;
//# sourceMappingURL=DataSource.js.map