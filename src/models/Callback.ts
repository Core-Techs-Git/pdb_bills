import {DocumentDTO} from '.';

/**
 * Response handler.
 * @typedef {Object} Callback
 */
export type Callback = (err?: Error, data?: Array<DocumentDTO> | DocumentDTO) => void;
