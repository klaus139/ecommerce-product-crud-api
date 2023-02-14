"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressApp = void 0;
const express_1 = __importDefault(require("express"));
const products_1 = require("./api/products");
const expressApp = async (app) => {
    app.use(express_1.default.json({ limit: '1mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '1mb' }));
    app.use(express_1.default.static(__dirname + '/public'));
    //api
    (0, products_1.products)(app);
};
exports.expressApp = expressApp;
