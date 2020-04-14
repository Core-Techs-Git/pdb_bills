import { RequestAPI, Request, CoreOptions, RequiredUriUrl } from 'request';
import { ValidatorInterface } from "../validator";
import { SearchOptionsDTO, DocumentDTO, ServiceConfiguration } from "../../model";
export declare abstract class Archive implements ArchiveInterface {
    protected abstract validator: ValidatorInterface;
    protected abstract config: ServiceConfiguration;
    protected abstract requester: RequestAPI<Request, CoreOptions, RequiredUriUrl>;
    abstract searchOne(docID: number): Promise<string>;
    abstract searchMany(options: SearchOptionsDTO): Promise<Array<DocumentDTO>>;
}
export interface ArchiveInterface {
    searchOne(id: number): Promise<string>;
    searchMany(options: SearchOptionsDTO): Promise<Array<DocumentDTO>>;
}
