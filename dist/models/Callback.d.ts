import { DocumentDTO } from '.';
/**
 * Response handler.
 * @typedef {Object} Callback
 */
export declare type Callback = (err?: Error, data?: Array<DocumentDTO> | DocumentDTO) => void;
