"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const DataSource_1 = __importDefault(require("./lib/DataSource"));
const baseApi_1 = __importDefault(require("./routes/baseApi"));
const main = async () => {
    const app = (0, express_1.default)();
    await DataSource_1.default.connect();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
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