/**
 * @module model
 * @packageDocumentation
 */

/**
 * Transfert data representing search options.
 * @typedef {Object} SearchOptionsDTO
 */
export type SearchOptionsDTO = {
  start?: string;
  numDocument?: string;
  priceFrom?: string;
  priceTo?: string;
  code_depot?: string;
  company_id?: string;
  dateFrom?: string;
  dateTo?: string;
  typeLivraison?: string;
};
