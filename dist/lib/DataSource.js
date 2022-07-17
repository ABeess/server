"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const myDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    url: process.env.DATABASE_URL,
    entities: ['dist/entities/*.js'],
    synchronize: true,
    logging: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
exports.default = myDataSource;
//# sourceMappingURL=DataSource.js.map