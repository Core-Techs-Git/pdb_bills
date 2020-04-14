"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BillError extends Error {
    constructor(info) {
        if (typeof info === 'string')
            super(info);
        else
            super(info.message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BillError = BillError;
//# sourceMappingURL=BillError.js.map