"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormateData = void 0;
function FormateData(data) {
    if (data) {
        return { data };
    }
    else {
        throw new Error("Data Not found!");
    }
}
exports.FormateData = FormateData;
