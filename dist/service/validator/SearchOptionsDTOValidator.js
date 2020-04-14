"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const validator_1 = __importDefault(require("validator"));
const error_1 = require("../../error");
const Validator_1 = require("./Validator");
let SearchOptionsDTOValidator = class SearchOptionsDTOValidator extends Validator_1.Validator {
    validate(data) {
        if (data.start && !validator_1.default.isInt(data.start, { min: 1 }))
            throw new error_1.ValidationError(`Invalid start option – ${data.start}`);
        if (data.numDocument && !validator_1.default.isInt(data.numDocument))
            throw new error_1.ValidationError(`Invalid numDocument option – ${data.numDocument}`);
        if (data.priceFrom && !(validator_1.default.isFloat(data.priceFrom) || validator_1.default.isInt(data.priceFrom)))
            throw new error_1.ValidationError(`Invalid priceFrom option – ${data.priceFrom}`);
        if (data.priceTo && !(validator_1.default.isFloat(data.priceTo) || validator_1.default.isInt(data.priceTo)))
            throw new error_1.ValidationError(`Invalid priceTo option – ${data.priceTo}`);
        if (data.code_depot && !validator_1.default.isInt(data.code_depot))
            throw new error_1.ValidationError(`Invalid code_depot option – ${data.code_depot}`);
        if (data.dateFrom && !validator_1.default.matches(data.dateFrom, /\d{2}\/\d{2}\/\d{2}/i))
            throw new error_1.ValidationError(`Invalid dateFrom option – ${data.dateFrom}`);
        if (data.dateTo && !validator_1.default.matches(data.dateTo, /\d{2}\/\d{2}\/\d{2}/i))
            throw new error_1.ValidationError(`Invalid dateTo option – ${data.dateTo}`);
    }
};
SearchOptionsDTOValidator = __decorate([
    inversify_1.injectable()
], SearchOptionsDTOValidator);
exports.SearchOptionsDTOValidator = SearchOptionsDTOValidator;
//# sourceMappingURL=SearchOptionsDTOValidator.js.map