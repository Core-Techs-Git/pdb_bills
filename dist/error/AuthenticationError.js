"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const BillError_1 = require("./BillError");
class AuthenticationError extends BillError_1.BillError {
    constructor(info) {
        super(info);
    }
}
exports.AuthenticationError = AuthenticationError;
//# sourceMappingURL=AuthenticationError.js.map