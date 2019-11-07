import { DocumentDTO } from '.';
/**
 * Response handler.
 * @typedef {Object} Callback
 */
export declare type Callback = (err?: Error, data?: Array<DocumentDTO> | string) => void;
export declare type CallbackPDF = (err?: Error, data?: string) => void;
