"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BillError_1 = require("@pdb_bills/services/error/BillError");
class AuthenticationError extends BillError_1.BillError {
    constructor(info) {
        super(info);
        if (!info)
            this.message = 'Authentication failed.';
    }
}
exports.AuthenticationError = AuthenticationError;
//# sourceMappingURL=AuthenticationError.js.map