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
    let isValid = true;
    isValid = data.start ? validator.isInt(data.start, {min: 1}) : isValid;
    isValid = data.numDocument ? validator.isInt(data.numDocument) : isValid;
    isValid = data.priceFrom ? validator.isInt(data.priceFrom) : isValid;
    isValid = data.priceTo ? validator.isInt(data.priceTo) : isValid;
    isValid = data.code_depot ? validator.isInt(data.code_depot) : isValid;
    isValid = data.company_id ? validator.isInt(String(data.company_id)) : isValid;
    isValid = data.dateFrom ? validator.matches(data.dateFrom, /\d{2}\/\d{2}\/\d{2}/i) : isValid;
    isValid = data.dateTo ? validator.matches(data.dateTo, /\d{2}\/\d{2}\/\d{2}/i) : isValid;
    return isValid;
  }
}
