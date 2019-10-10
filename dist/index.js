"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const lib_1 = require("./lib");
const const_1 = require("./const");
const archive = lib_1.inversifyContainer.get(const_1.TYPES.ArchiveInterface);
/**
 * Search and return a document identify by his ID.
 * @param {number} docID The id of the document needed.
 * @param {Callback} callback Function to execute when the document is retreive.
 */
function serviceDoc(docID, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doc = yield archive.searchOne(docID);
            callback(null, doc);
        }
        catch (err) {
            callback(err);
        }
    });
}
exports.serviceDoc = serviceDoc;
/**
 * Search and return multiple documents matching the parameters.
 * @param {SearchOptionsDTO} options Search parameters for multiple documents.
 * @param {Callback} callback Functions to execute when documents are retrieve.
 */
function serviceSearch(options, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = yield archive.searchMany(options);
            callback(null, docs);
        }
        catch (err) {
            callback(err);
        }
    });
}
exports.serviceSearch = serviceSearch;
//# sourceMappingURL=index.js.map