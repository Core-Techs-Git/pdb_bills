import { ValidatorInterface } from './validator';
import { SearchOptionsDTO, DocumentDTO } from '../models';
import { ArchiveStartegyInterface } from '../strategies';
/**
 * Provid an api to retrieve stored documents.
 */
export declare class Archive implements ArchiveInterface {
    /**
     * Strategy to be used as api implementation.
     * @typedef ArchiveStartegyInterface
     * @access protected
     */
    protected archiveStrategy: ArchiveStartegyInterface;
    /**
     * Validate recieving data.
     * @typedef ValidatorInterface
     * @access protected
     */
    protected validator: ValidatorInterface;
    constructor(archiveStrategy: ArchiveStartegyInterface, validator: ValidatorInterface);
    setStrategy(archiveStrategy: ArchiveStartegyInterface): void;
    searchOne(docID: number): Promise<string>;
    searchMany(options: SearchOptionsDTO): Promise<Array<DocumentDTO>>;
}
/**
 * Archives api interface.
 */
export interface ArchiveInterface {
    /**
     * Change the archive service provider (which is a strategy).
     * @param {ArchiveStartegyInterface} archiveStrategy The new strategy to be used.
     */
    setStrategy(archiveStrategy: ArchiveStartegyInterface): void;
    /**
     * Search and return a document identify by his ID.
     * @param {number} docID The id of the document needed.
     * @returns {Promise<string>} Retrieved document or an error.
     */
    searchOne(id: number): Promise<string>;
    /**
     * Search and return multiple documents matching the parameters.
     * @param {SearchOptionsDTO} options Search parameters for multiple documents.
     * @returns {Promise<Array<DocumentDTO>>} Retrieved documents that matched the parameters or an error.
     */
    searchMany(options: SearchOptionsDTO): Promise<Array<DocumentDTO>>;
}
