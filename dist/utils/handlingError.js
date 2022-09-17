"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class HandlingError {
    constructor(error) {
        this.code = error.code || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        this.message = error.message;
    }
}
//# sourceMappingURL=handlingError.js.map