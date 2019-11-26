import 'reflect-metadata';
import 'module-alias/register';

import {TYPES, ARCHIVE} from '@pdb_bills/const';
import {inversifyContainer} from '@pdb_bills/lib';
import {SearchOptionsDTO} from '@pdb_bills/models';
import {ArchiveInterface, BillError, ValidationError} from '@pdb_bills/services';

/**
 * Search and return a document identify by his ID.
 * @param {number} docID The id of the document needed.
 * @param {Callback} callback Function to execute when the document is retreive.
 */
export function serviceDoc(docID: number, callback: CallableFunction, archiveName?: string): void {
  if (archiveName && !Object.values(ARCHIVE).includes(archiveName))
    return callback(new ValidationError(`Invalid archiveName option – ${archiveName}`));

  try {
    const archive: ArchiveInterface = inversifyContainer.getNamed<ArchiveInterface>(TYPES.ArchiveInterface, archiveName || ARCHIVE.DOCAPOSTE);
    archive.searchOne(docID).then(doc => {
      callback(null, doc);
    });
  } catch (error) {
    if (error instanceof BillError) callback(error);
    else callback(new BillError(error));
  }
}

/**
 * Search and return multiple documents matching the parameters.
 * @param {SearchOptionsDTO} options Search parameters for multiple documents.
 * @param {Callback} callback Functions to execute when documents are retrieve.
 */
export function serviceSearch(options: SearchOptionsDTO, callback: CallableFunction, archiveName?: string): void {
  if (archiveName && !Object.values(ARCHIVE).includes(archiveName))
    return callback(new ValidationError(`Invalid archiveName option – ${archiveName}`));

  try {
    const archive: ArchiveInterface = inversifyContainer.getNamed<ArchiveInterface>(TYPES.ArchiveInterface, archiveName || ARCHIVE.DOCAPOSTE);
    archive.searchMany(options).then(docs => {
      callback(null, docs);
    });
  } catch (error) {
    if (error instanceof BillError) callback(error);
    else callback(new BillError(error));
  }
}
