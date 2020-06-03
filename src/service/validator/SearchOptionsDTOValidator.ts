/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @module service
 * @packageDocumentation
 */

import {injectable} from 'inversify';
import m from 'moment';
import v from 'validator';

import {SearchOptionsDTO} from '@/model';
import {ValidationError} from '@/error';
import {VALID_DATE_FORMAT} from '@/const/validators';
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
    if (data.dateFrom && !m(data.dateFrom, VALID_DATE_FORMAT, true).isValid()) throw new ValidationError(`Invalid dateFrom option – ${data.dateFrom}`);
    if (data.dateTo && !m(data.dateTo, VALID_DATE_FORMAT, true).isValid()) throw new ValidationError(`Invalid dateTo option – ${data.dateTo}`);
  }
}
