import { RequestAPI, Request, CoreOptions, RequiredUriUrl } from 'request';
import { ValidatorInterface } from '@pdb_bills/services/validator';
import { SearchOptionsDTO, DocumentDTO, ServiceConfiguration } from '@pdb_bills/models';
/**
 * Provid an api to retrieve stored documents.
 */
export declare abstract class Archive implements ArchiveInterface {
    /**
     * Validate recieving data.
     * @typedef ValidatorInterface
     * @access protected
     */
    protected abstract validator: ValidatorInterface;
    /**
     * Service configuration.
     * @typedef ServiceConfiguration
     * @access protected
     */
    protected abstract config: ServiceConfiguration;
    /**
     * Requester object.
     * @typedef RequestAPI<Request, CoreOptions, RequiredUriUrl>
     * @access protected
     */
    protected abstract requester: RequestAPI<Request, CoreOptions, RequiredUriUrl>;
    abstract searchOne(docID: number): Promise<string>;
    abstract searchMany(options: SearchOptionsDTO): Promise<Array<DocumentDTO>>;
}
/**
 * Archives api interface.
 */
export interface ArchiveInterface {
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
