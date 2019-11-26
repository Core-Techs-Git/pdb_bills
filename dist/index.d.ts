import 'reflect-metadata';
import 'module-alias/register';
import { SearchOptionsDTO } from '@pdb_bills/models';
/**
 * Search and return a document identify by his ID.
 * @param {number} docID The id of the document needed.
 * @param {Callback} callback Function to execute when the document is retreive.
 */
export declare function serviceDoc(docID: number, callback: CallableFunction, archiveName?: string): void;
/**
 * Search and return multiple documents matching the parameters.
 * @param {SearchOptionsDTO} options Search parameters for multiple documents.
 * @param {Callback} callback Functions to execute when documents are retrieve.
 */
export declare function serviceSearch(options: SearchOptionsDTO, callback: CallableFunction, archiveName?: string): void;
