/* eslint-disable @typescript-eslint/camelcase */
import {injectable} from 'inversify';
import * as validator from 'validator';

import {ValidatorInterface} from '.';
import {SearchOptionsDTO} from '../../models';

/**
 * Validator for SearchOptionsDTO.
 */
@injectable()
export class ValidateSearchOptionsDTO implements ValidatorInterface {
  public isValid<T>(data: T): boolean {
    return this.isValidSearchOptionsDTO(data);
  }

  /**
   * Makes sure that data is a type of SearchOptionsDTO.
   * @param {any} data The data that need to be validate.
   * @returns {boolean} True if provided data is type of SearchOptionsDTO.
   */
  private isValidSearchOptionsDTO(data): data is SearchOptionsDTO {
    const start = data.start ? validator.isInt(data.start, {min: 1}) : true;
    const numDocument = data.numDocument ? validator.isInt(data.numDocument) : true;
    const priceFrom = data.priceFrom ? validator.isInt(data.priceFrom) : true;
    const priceTo = data.priceTo ? validator.isInt(data.priceTo) : true;
    const code_depot = data.code_depot ? validator.isInt(data.code_depot) : true;
    const company_id = data.company_id ? validator.isInt(String(data.company_id)) : true;
    const dateFrom = data.dateFrom ? validator.matches(data.dateFrom, /^(\d{2}[\/-]){2}\d{2}$/) || Boolean(validator.toDate(data.dateFrom)) : true;
    const dateTo = data.dateTo ? validator.matches(data.dateTo, /^(\d{2}[\/-]){2}\d{2}$/) || Boolean(validator.toDate(data.dateTo)) : true;
    return start && numDocument && priceFrom && priceTo && code_depot && company_id && dateFrom && dateTo;
  }
}
