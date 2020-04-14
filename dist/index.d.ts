import 'reflect-metadata';
import { SearchOptionsDTO } from "./model";
export declare function serviceDoc(docID: number, callback: CallableFunction, archiveName?: string): void;
export declare function serviceSearch(options: SearchOptionsDTO, callback: CallableFunction, archiveName?: string): void;
