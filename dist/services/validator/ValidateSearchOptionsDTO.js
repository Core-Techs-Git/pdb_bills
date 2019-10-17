"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const validator = require("validator");
/**
 * Validator for SearchOptionsDTO.
 */
let ValidateSearchOptionsDTO = class ValidateSearchOptionsDTO {
    isValid(data) {
        return this.isValidSearchOptionsDTO(data);
    }
    /**
     * Makes sure that data is a type of SearchOptionsDTO.
     * @param {any} data The data that need to be validate.
     * @returns {boolean} True if provided data is type of SearchOptionsDTO.
     */
    isValidSearchOptionsDTO(data) {
        let isValid = true;
        isValid = data.start ? validator.isInt(data.start, { min: 1 }) : isValid;
        isValid = data.numDocument ? validator.isInt(data.numDocument) : isValid;
        isValid = data.priceFrom ? validator.isInt(data.priceFrom) : isValid;
        isValid = data.priceTo ? validator.isInt(data.priceTo) : isValid;
        isValid = data.code_depot ? validator.isInt(data.code_depot) : isValid;
        isValid = data.company_id ? validator.isInt(String(data.company_id)) : isValid;
        isValid = data.dateFrom ? validator.matches(data.dateFrom, /\d{2}\/\d{2}\/\d{2}/i) : isValid;
        isValid = data.dateTo ? validator.matches(data.dateTo, /\d{2}\/\d{2}\/\d{2}/i) : isValid;
        return isValid;
    }
};
ValidateSearchOptionsDTO = __decorate([
    inversify_1.injectable()
], ValidateSearchOptionsDTO);
exports.ValidateSearchOptionsDTO = ValidateSearchOptionsDTO;
//# sourceMappingURL=ValidateSearchOptionsDTO.js.map