"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const const_1 = require("../const");
const error_1 = require("./error");
/**
 * Provid an api to retrieve stored documents.
 */
let Archive = class Archive {
    constructor(archiveStrategy, validator) {
        this.archiveStrategy = archiveStrategy;
        this.validator = validator;
    }
    setStrategy(archiveStrategy) {
        this.archiveStrategy = archiveStrategy;
    }
    searchOne(docID) {
        if (isNaN(+docID))
            return Promise.reject(new error_1.ValidationError(`Invalid docID ${docID}.`));
        else
            return this.archiveStrategy.searchOne(docID);
    }
    searchMany(options) {
        if (!this.validator.isValid(options))
            return Promise.reject(new error_1.ValidationError(`Invalid request options – ${JSON.stringify(options)}`));
        else
            return this.archiveStrategy.searchMany(options);
    }
};
Archive = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(const_1.TYPES.ArchiveStartegyInterface)),
    __param(1, inversify_1.inject(const_1.TYPES.ValidatorInterface)), __param(1, inversify_1.targetName(const_1.VALIDATORS.SEARCH_OPTIONS_DTO)),
    __metadata("design:paramtypes", [Object, Object])
], Archive);
exports.Archive = Archive;
//# sourceMappingURL=Archive.js.map