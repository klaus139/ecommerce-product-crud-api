"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_CODES = exports.APIError = exports.AppError = void 0;
class AppError extends Error {
    constructor(name, statusCode, description, isOperational, errorStack, logingErrorResponse) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errorStack = errorStack;
        this.logError = logingErrorResponse;
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
//api Specific Errors
class APIError extends AppError {
    constructor(name, statusCode = exports.STATUS_CODES.INTERNAL_ERROR, description = 'Internal Server Error', isOperational = true, errorStack, logingErrorResponse) {
        super(name, statusCode, description, isOperational, errorStack, logingErrorResponse);
    }
}
exports.APIError = APIError;
exports.STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};
