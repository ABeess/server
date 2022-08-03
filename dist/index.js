"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const DataSource_1 = __importDefault(require("./lib/DataSource"));
const baseApi_1 = __importDefault(require("./routes/baseApi"));
const redis = __importStar(require("redis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("./socket"));
const main = async () => {
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redisClient = redis.createClient({ legacyMode: true });
    await DataSource_1.default.connect();
    await redisClient.connect();
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
        store: new RedisStore({ client: redisClient }),
        secret: String(process.env.SESSION_SECRET),
        resave: false,
        saveUninitialized: false,
    }));
    app.use('/api', baseApi_1.default);
    app.use('/', (_req, res) => {
        res.sendFile(__dirname + '/index.html');
    });
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