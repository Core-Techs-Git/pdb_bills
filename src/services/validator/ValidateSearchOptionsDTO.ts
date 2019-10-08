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
    return !(
      (data.start === undefined || validator.isInt(data.start, {min: 1})) &&
      (data.numDocument === undefined || validator.isInt(data.numDocument)) &&
      (data.priceFrom === undefined || validator.isInt(data.priceFrom)) &&
      (data.priceTo === undefined || validator.isInt(data.priceTo)) &&
      (data.code_depot === undefined || validator.isInt(data.code_depot)) &&
      (data.company_id === undefined || typeof data.company_id === 'number') &&
      (data.dateFrom === undefined || validator.matches(data.dateFrom, /\d{2}\/\d{2}\/\d{2}/i)) &&
      (data.dateTo === undefined || validator.matches(data.dateTo, /\d{2}\/\d{2}\/\d{2}/i)) &&
      data.typeLivraison === undefined
    );
  }
}
