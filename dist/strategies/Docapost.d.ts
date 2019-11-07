import { RequestAPI, Request, UriOptions, CoreOptions, RequiredUriUrl } from 'request';
import { ArchiveStartegyInterface } from '.';
import { DocumentDTO, SearchOptionsDTO } from '../models';
/**
 * Implement docapost service as an archive strategy
 */
export declare class Docapost implements ArchiveStartegyInterface {
    /**
     * Request send to docaposte.
     * @typedef RequestOptionsDTO
     * @access protected
     */
    protected requestOptions: UriOptions & CoreOptions;
    /**
     * Request send to docaposte.
     * @typedef RequestAPI<Request, CoreOptions, RequiredUriUrl>
     * @access protected
     */
    protected requester: RequestAPI<Request, CoreOptions, RequiredUriUrl>;
    /**
     * Request send to docaposte.
     * @access protected
     */
    protected config: any;
    constructor();
    /**
     * Authentication to docaposte service.
     * @returns {Promise<string>} A token in case of successful authentication.
     */
    protected authenticate(): Promise<string>;
    searchOne(docID: number): Promise<string>;
    searchMany(query: SearchOptionsDTO): Promise<Array<DocumentDTO>>;
}
