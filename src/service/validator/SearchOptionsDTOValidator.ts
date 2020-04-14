/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @module service
 * @packageDocumentation
 */

import {injectable} from 'inversify';
import v from 'validator';

import {SearchOptionsDTO} from '@/model';
import {ValidationError} from '@/error';
import {Validator} from '@/service/validator/Validator';

/**
 * Validator for SearchOptionsDTO.
 */
@injectable()
export class SearchOptionsDTOValidator extends Validator {
  public validate(data: SearchOptionsDTO): void {
    if (data.start && !v.isInt(data.start, {min: 1})) throw new ValidationError(`Invalid start option – ${data.start}`);
    if (data.numDocument && !v.isInt(data.numDocument)) throw new ValidationError(`Invalid numDocument option – ${data.numDocument}`);
    if (data.priceFrom && !(v.isFloat(data.priceFrom) || v.isInt(data.priceFrom)))
      throw new ValidationError(`Invalid priceFrom option – ${data.priceFrom}`);
    if (data.priceTo && !(v.isFloat(data.priceTo) || v.isInt(data.priceTo))) throw new ValidationError(`Invalid priceTo option – ${data.priceTo}`);
    if (data.code_depot && !v.isInt(data.code_depot)) throw new ValidationError(`Invalid code_depot option – ${data.code_depot}`);
    if (data.dateFrom && !v.matches(data.dateFrom, /\d{2}\/\d{2}\/\d{2}/i)) throw new ValidationError(`Invalid dateFrom option – ${data.dateFrom}`);
    if (data.dateTo && !v.matches(data.dateTo, /\d{2}\/\d{2}\/\d{2}/i)) throw new ValidationError(`Invalid dateTo option – ${data.dateTo}`);
  }
}
