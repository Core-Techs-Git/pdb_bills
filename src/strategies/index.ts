import {SearchOptionsDTO, DocumentDTO} from '../models';

export * from './Docapost';

/**
 * Archive strategy implementation interface.
 */
export interface ArchiveStartegyInterface {
  /**
   * Search and return a document identify by his ID.
   * @param {number} docID The id of the document needed.
   * @returns {Promise<string>} Retrieved document or an error.
   */
  searchOne(docID: number): Promise<string>;

  /**
   * Search and return multiple documents matching the parameters.
   * @param {SearchOptionsDTO} options Search parameters for multiple documents.
   * @returns {Promise<Array<DocumentDTO>>} Retrieved documents that matched the parameters or an error.
   */
  searchMany(query: SearchOptionsDTO): Promise<Array<DocumentDTO>>;
}
