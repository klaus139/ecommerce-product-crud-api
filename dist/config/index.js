"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_secret = exports.DB_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "prod") {
    const configFile = `.env.dev`;
    dotenv_1.default.config({ path: configFile });
}
else {
    dotenv_1.default.config();
}
exports.PORT = process.env.PORT;
console.log(exports.PORT);
exports.DB_URL = process.env.DB_URL;
exports.APP_secret = process.env.APP_SECRET;
