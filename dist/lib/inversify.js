"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const pdb_requester_1 = __importDefault(require("@core-techs-git/pdb_requester"));
const const_1 = require("../const");
const service_1 = require("../service");
const container = new inversify_1.Container();
Object.keys(const_1.ARCHIVE).map((archiveName) => {
    container
        .bind(const_1.TYPES.ConfigurationInterface)
        .toDynamicValue(() => {
        return new service_1.Configuration(const_1.ARCHIVE[archiveName]);
    })
        .inSingletonScope()
        .whenTargetNamed(const_1.ARCHIVE[archiveName]);
    container
        .bind(const_1.TYPES.Requester)
        .toDynamicValue(() => {
        return pdb_requester_1.default(const_1.ARCHIVE[archiveName]);
    })
        .inSingletonScope()
        .whenTargetNamed(const_1.ARCHIVE[archiveName]);
});
container.bind(const_1.TYPES.ValidatorInterface).to(service_1.SearchOptionsDTOValidator).whenTargetNamed(const_1.VALIDATORS.SEARCH_OPTIONS_DTO);
container.bind(const_1.TYPES.ArchiveInterface).to(service_1.Docapost).whenTargetNamed(const_1.ARCHIVE.DOCAPOSTE);
exports.default = container;
//# sourceMappingURL=inversify.js.map