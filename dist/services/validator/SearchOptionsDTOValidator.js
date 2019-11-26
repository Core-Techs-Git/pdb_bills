"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const inversify_1 = require("inversify");
const validator = __importStar(require("validator"));
const Validator_1 = require("./Validator");
const error_1 = require("@pdb_bills/services/error");
/**
 * Validator for SearchOptionsDTO.
 */
let SearchOptionsDTOValidator = class SearchOptionsDTOValidator extends Validator_1.Validator {
    validate(data) {
        if (data.start && !validator.isInt(data.start, { min: 1 }))
            throw new error_1.ValidationError(`Invalid start option – ${data.start}`);
        if (data.numDocument && !validator.isInt(data.numDocument))
            throw new error_1.ValidationError(`Invalid numDocument option – ${data.numDocument}`);
        if (data.priceFrom && !validator.isInt(data.priceFrom))
            throw new error_1.ValidationError(`Invalid priceFrom option – ${data.priceFrom}`);
        if (data.priceTo && !validator.isInt(data.priceTo))
            throw new error_1.ValidationError(`Invalid priceTo option – ${data.priceTo}`);
        if (data.code_depot && !validator.isInt(data.code_depot))
            throw new error_1.ValidationError(`Invalid code_depot option – ${data.code_depot}`);
        if (data.dateFrom && !validator.matches(data.dateFrom, /\d{2}\/\d{2}\/\d{2}/i))
            throw new error_1.ValidationError(`Invalid dateFrom option – ${data.dateFrom}`);
        if (data.dateTo && !validator.matches(data.dateTo, /\d{2}\/\d{2}\/\d{2}/i))
            throw new error_1.ValidationError(`Invalid dateTo option – ${data.dateTo}`);
    }
};
SearchOptionsDTOValidator = __decorate([
    inversify_1.injectable()
], SearchOptionsDTOValidator);
exports.SearchOptionsDTOValidator = SearchOptionsDTOValidator;
//# sourceMappingURL=SearchOptionsDTOValidator.js.map