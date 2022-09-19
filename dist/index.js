"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const DataSource_1 = __importDefault(require("./lib/DataSource"));
const baseApi_1 = __importDefault(require("./routes/baseApi"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("./socket"));
const redis_1 = __importDefault(require("./utils/redis"));
const passport_1 = __importDefault(require("./lib/passport"));
const main = async () => {
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    await DataSource_1.default.connect();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)({
        origin: 'http://localhost:3090',
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        },
        store: new RedisStore({ client: redis_1.default }),
        secret: String(process.env.SESSION_SECRET),
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use('/api', baseApi_1.default);
    const httpServer = http_1.default.createServer(app);
    (0, socket_1.default)(httpServer);
    const PORT = process.env.PORT || 3080;
    httpServer.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}: http://localhost:${PORT}`);
    });
};
main().catch((error) => {
    console.log('Server starting error:', error);
});
//# sourceMappingURL=index.js.map