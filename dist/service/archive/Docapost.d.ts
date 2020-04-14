import { RequestAPI, Request, CoreOptions, RequiredUriUrl } from 'request';
import { Archive } from "./Archive";
import { ValidatorInterface } from "../validator";
import { ConfigurationInterface } from "../Configuration";
import { DocumentDTO, SearchOptionsDTO, ServiceConfiguration } from "../../model";
export declare class Docapost extends Archive {
    protected config: ServiceConfiguration;
    protected validator: ValidatorInterface;
    protected requester: RequestAPI<Request, CoreOptions, RequiredUriUrl>;
    constructor(config: ConfigurationInterface, requester: RequestAPI<Request, CoreOptions, RequiredUriUrl>, validator: ValidatorInterface);
    protected authenticate(): Promise<string>;
    searchOne(docID: number): Promise<string>;
    searchMany(query: SearchOptionsDTO): Promise<Array<DocumentDTO>>;
}
