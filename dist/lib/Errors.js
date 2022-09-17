"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlingError = exports.ImATeapot = exports.RequestTimeOut = exports.NotAcceptableError = exports.LengthRequiredError = exports.InternalServerError = exports.NotAllowed = exports.BadRequestError = exports.ForbiddenError = exports.UnauthorizedError = exports.ConflictError = exports.NotFoundError = exports.MyError = void 0;
const http_status_codes_1 = require("http-status-codes");
class MyError extends Error {
    constructor(message, code) {
        super(message);
        this.code = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.code = code;
    }
}
exports.MyError = MyError;
MyError.message = 'MyError';
class NotFoundError extends MyError {
    constructor(message) {
        super(message, NotFoundError.code);
    }
}
exports.NotFoundError = NotFoundError;
NotFoundError.message = 'NotFoundError';
NotFoundError.code = http_status_codes_1.StatusCodes.NOT_FOUND;
class ConflictError extends MyError {
    constructor(message) {
        super(message, ConflictError.code);
    }
}
exports.ConflictError = ConflictError;
ConflictError.message = 'ConflictError';
ConflictError.code = http_status_codes_1.StatusCodes.CONFLICT;
class UnauthorizedError extends MyError {
    constructor(message) {
        super(message, UnauthorizedError.code);
    }
}
exports.UnauthorizedError = UnauthorizedError;
UnauthorizedError.message = 'UnauthorizedError';
UnauthorizedError.code = http_status_codes_1.StatusCodes.UNAUTHORIZED;
class ForbiddenError extends MyError {
    constructor(message) {
        super(message, ForbiddenError.code);
    }
}
exports.ForbiddenError = ForbiddenError;
ForbiddenError.message = 'ForbiddenError';
ForbiddenError.code = http_status_codes_1.StatusCodes.FORBIDDEN;
class BadRequestError extends MyError {
    constructor(message) {
        super(message, BadRequestError.code);
    }
}
exports.BadRequestError = BadRequestError;
BadRequestError.message = 'BadRequestError';
BadRequestError.code = http_status_codes_1.StatusCodes.BAD_REQUEST;
class NotAllowed extends MyError {
    constructor(message) {
        super(message, BadRequestError.code);
    }
}
exports.NotAllowed = NotAllowed;
NotAllowed.message = 'MethodNotAllowed';
NotAllowed.code = http_status_codes_1.StatusCodes.METHOD_NOT_ALLOWED;
class InternalServerError extends MyError {
    constructor(message) {
        super(message, InternalServerError.code);
    }
}
exports.InternalServerError = InternalServerError;
InternalServerError.message = 'InternalServerError';
InternalServerError.code = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
class LengthRequiredError extends MyError {
    constructor(message) {
        super(message, LengthRequiredError.code);
    }
}
exports.LengthRequiredError = LengthRequiredError;
LengthRequiredError.message = 'LengthRequiredError';
LengthRequiredError.code = http_status_codes_1.StatusCodes.LENGTH_REQUIRED;
class NotAcceptableError extends MyError {
    constructor(message) {
        super(message, NotAcceptableError.code);
    }
}
exports.NotAcceptableError = NotAcceptableError;
NotAcceptableError.message = 'NotAcceptableError';
NotAcceptableError.code = http_status_codes_1.StatusCodes.NOT_ACCEPTABLE;
class RequestTimeOut extends MyError {
    constructor(message) {
        super(message, RequestTimeOut.code);
    }
}
exports.RequestTimeOut = RequestTimeOut;
RequestTimeOut.message = 'RequestTimeOut';
RequestTimeOut.code = http_status_codes_1.StatusCodes.REQUEST_TIMEOUT;
class ImATeapot extends MyError {
    constructor(message) {
        super(message, ImATeapot.code);
    }
}
exports.ImATeapot = ImATeapot;
ImATeapot.message = 'ImATeapot';
ImATeapot.code = http_status_codes_1.StatusCodes.IM_A_TEAPOT;
class HandlingError {
    constructor(res, error) {
        this.code = error.code || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        this.message = error.message;
        res.status(this.code).json({
            code: this.code,
            message: this.message,
        });
    }
}
exports.HandlingError = HandlingError;
//# sourceMappingURL=Errors.js.map