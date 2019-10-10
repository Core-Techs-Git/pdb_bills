import { RequestOptionsDTO } from '@core-techs-git/pdb_requester/dist/models';
import { RequesterInterface } from '@core-techs-git/pdb_requester/dist/services';
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
    protected requestOptions: RequestOptionsDTO;
    /**
     * Request send to docaposte.
     * @typedef RequestOptionsDTO
     * @access protected
     */
    protected requester: RequesterInterface;
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
    searchOne(docID: number): Promise<DocumentDTO>;
    searchMany(query: SearchOptionsDTO): Promise<Array<DocumentDTO>>;
}
