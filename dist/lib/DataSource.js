"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    url: process.env.DATABASE_URL,
    entities: ['dist/entities/*.js'],
    synchronize: false,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
exports.default = AppDataSource;
//# sourceMappingURL=DataSource.js.map