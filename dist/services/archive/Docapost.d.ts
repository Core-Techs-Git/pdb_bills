import { RequestAPI, Request, CoreOptions, RequiredUriUrl } from 'request';
import { Archive } from './Archive';
import { ValidatorInterface } from '@pdb_bills/services/validator';
import { ConfigurationInterface } from '@pdb_bills/services/Configuration';
import { DocumentDTO, SearchOptionsDTO, ServiceConfiguration } from '@pdb_bills/models';
/**
 * Implement docapost service as an archive strategy
 */
export declare class Docapost extends Archive {
    protected config: ServiceConfiguration;
    protected validator: ValidatorInterface;
    protected requester: RequestAPI<Request, CoreOptions, RequiredUriUrl>;
    constructor(config: ConfigurationInterface, requester: RequestAPI<Request, CoreOptions, RequiredUriUrl>, validator: ValidatorInterface);
    /**
     * Authentication to docaposte service.
     * @returns {Promise<string>} A token in case of successful authentication.
     */
    protected authenticate(): Promise<string>;
    searchOne(docID: number): Promise<string>;
    searchMany(query: SearchOptionsDTO): Promise<Array<DocumentDTO>>;
}
