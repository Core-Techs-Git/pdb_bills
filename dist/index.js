"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceSearch = exports.serviceDoc = void 0;
require("reflect-metadata");
const const_1 = require("./const");
const lib_1 = require("./lib");
const error_1 = require("./error");
function serviceDoc(docID, callback, archiveName) {
    if (archiveName && !Object.values(const_1.ARCHIVE).includes(archiveName))
        return callback(new error_1.ValidationError(`Invalid archiveName option – ${archiveName}`));
    try {
        const archive = lib_1.inversifyContainer.getNamed(const_1.TYPES.ArchiveInterface, archiveName || const_1.ARCHIVE.DOCAPOSTE);
        archive
            .searchOne(docID)
            .then((doc) => {
            callback(null, doc);
        })
            .catch((err) => {
            callback(err);
        });
    }
    catch (error) {
        callback(new error_1.BillError(error));
    }
}
exports.serviceDoc = serviceDoc;
function serviceSearch(options, callback, archiveName) {
    if (archiveName && !Object.values(const_1.ARCHIVE).includes(archiveName))
        return callback(new error_1.ValidationError(`Invalid archiveName option – ${archiveName}`));
    try {
        const archive = lib_1.inversifyContainer.getNamed(const_1.TYPES.ArchiveInterface, archiveName || const_1.ARCHIVE.DOCAPOSTE);
        archive
            .searchMany(options)
            .then((docs) => {
            callback(null, docs);
        })
            .catch((err) => {
            callback(err);
        });
    }
    catch (error) {
        callback(new error_1.BillError(error));
    }
}
exports.serviceSearch = serviceSearch;
//# sourceMappingURL=index.js.map