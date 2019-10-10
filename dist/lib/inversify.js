"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const const_1 = require("../const");
const Archive_1 = require("../services/Archive");
const Docapost_1 = require("../strategies/Docapost");
const validator_1 = require("../services/validator");
const container = new inversify_1.Container();
//  Define autowiring by binding interfaces to instanciated class.
container.bind(const_1.TYPES.ArchiveStartegyInterface).to(Docapost_1.Docapost);
container.bind(const_1.TYPES.ArchiveInterface).to(Archive_1.Archive);
container
    .bind(const_1.TYPES.ValidatorInterface)
    .to(validator_1.ValidateSearchOptionsDTO)
    .when((request) => {
    return request.target.name.equals(const_1.VALIDATORS.SEARCH_OPTIONS_DTO);
});
exports.default = container;
//# sourceMappingURL=inversify.js.map