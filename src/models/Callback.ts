import {DocumentDTO} from '.';

/**
 * Response handler.
 * @typedef {Object} Callback
 */
export type Callback = (err?: Error, data?: Array<DocumentDTO> | string) => void;
export type CallbackPDF = (err?: Error, data?: string) => void;
