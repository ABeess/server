"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_mongo_1 = __importDefault(require("connect-mongo"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const DataSource_1 = __importDefault(require("./lib/DataSource"));
const baseApi_1 = __importDefault(require("./routes/baseApi"));
const main = async () => {
    const app = (0, express_1.default)();
    await DataSource_1.default.connect();
    await mongoose_1.default.connect(String(process.env.MONGO_URI)).then(() => console.log('MongoConected'));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, express_session_1.default)({
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        },
        store: connect_mongo_1.default.create({
            mongoUrl: String(process.env.MONGO_URI),
        }),
        secret: String(process.env.SESSION_SECRET),
        resave: false,
        saveUninitialized: false,
    }));
    app.use('/api', baseApi_1.default);
    app.use('/', (_req, res) => {
        res.send('Hello World!');
    });
    const PORT = process.env.PORT || 3080;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}: http://localhost:${PORT}`);
    });
};
main().catch((error) => {
    console.log('Server starting error:', error);
});
//# sourceMappingURL=index.js.map