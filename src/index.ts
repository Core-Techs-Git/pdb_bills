import 'reflect-metadata';
import {DocumentDTO, SearchOptionsDTO, Callback, CallbackPDF} from './models';
import {ArchiveInterface} from './services/Archive';
import {inversifyContainer} from './lib';
import {TYPES} from './const';

const archive: ArchiveInterface = inversifyContainer.get<ArchiveInterface>(TYPES.ArchiveInterface);

/**
 * Search and return a document identify by his ID.
 * @param {number} docID The id of the document needed.
 * @param {Callback} callback Function to execute when the document is retreive.
 */
export async function serviceDoc(docID: number, callback: CallbackPDF): Promise<void> {
  try {
    const doc: string = await archive.searchOne(docID);
    callback(null, doc);
  } catch (err) {
    callback(err);
  }
}

/**
 * Search and return multiple documents matching the parameters.
 * @param {SearchOptionsDTO} options Search parameters for multiple documents.
 * @param {Callback} callback Functions to execute when documents are retrieve.
 */
export async function serviceSearch(options: SearchOptionsDTO, callback: Callback): Promise<void> {
  try {
    const docs: Array<DocumentDTO> = await archive.searchMany(options);
    callback(null, docs);
  } catch (err) {
    callback(err);
  }
}
