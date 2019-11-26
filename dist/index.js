"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("module-alias/register");
const const_1 = require("@pdb_bills/const");
const lib_1 = require("@pdb_bills/lib");
const services_1 = require("@pdb_bills/services");
/**
 * Search and return a document identify by his ID.
 * @param {number} docID The id of the document needed.
 * @param {Callback} callback Function to execute when the document is retreive.
 */
function serviceDoc(docID, callback, archiveName) {
    if (archiveName && !Object.values(const_1.ARCHIVE).includes(archiveName))
        return callback(new services_1.ValidationError(`Invalid archiveName option – ${archiveName}`));
    try {
        const archive = lib_1.inversifyContainer.getNamed(const_1.TYPES.ArchiveInterface, archiveName || const_1.ARCHIVE.DOCAPOSTE);
        archive.searchOne(docID).then(doc => {
            callback(null, doc);
        });
    }
    catch (error) {
        if (error instanceof services_1.BillError)
            callback(error);
        else
            callback(new services_1.BillError(error));
    }
}
exports.serviceDoc = serviceDoc;
/**
 * Search and return multiple documents matching the parameters.
 * @param {SearchOptionsDTO} options Search parameters for multiple documents.
 * @param {Callback} callback Functions to execute when documents are retrieve.
 */
function serviceSearch(options, callback, archiveName) {
    if (archiveName && !Object.values(const_1.ARCHIVE).includes(archiveName))
        return callback(new services_1.ValidationError(`Invalid archiveName option – ${archiveName}`));
    try {
        const archive = lib_1.inversifyContainer.getNamed(const_1.TYPES.ArchiveInterface, archiveName || const_1.ARCHIVE.DOCAPOSTE);
        archive.searchMany(options).then(docs => {
            callback(null, docs);
        });
    }
    catch (error) {
        if (error instanceof services_1.BillError)
            callback(error);
        else
            callback(new services_1.BillError(error));
    }
}
exports.serviceSearch = serviceSearch;
//# sourceMappingURL=index.js.map