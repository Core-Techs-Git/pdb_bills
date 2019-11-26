/* eslint-disable @typescript-eslint/no-explicit-any */
import {injectable} from 'inversify';
import * as validator from 'validator';

import {Validator} from './Validator';
import {SearchOptionsDTO} from '@pdb_bills/models';
import {ValidationError} from '@pdb_bills/services/error';

/**
 * Validator for SearchOptionsDTO.
 */
@injectable()
export class SearchOptionsDTOValidator extends Validator {
  public validate(data: SearchOptionsDTO): void {
    if (data.start && !validator.isInt(data.start, {min: 1})) throw new ValidationError(`Invalid start option – ${data.start}`);
    if (data.numDocument && !validator.isInt(data.numDocument)) throw new ValidationError(`Invalid numDocument option – ${data.numDocument}`);
    if (data.priceFrom && !validator.isInt(data.priceFrom)) throw new ValidationError(`Invalid priceFrom option – ${data.priceFrom}`);
    if (data.priceTo && !validator.isInt(data.priceTo)) throw new ValidationError(`Invalid priceTo option – ${data.priceTo}`);
    if (data.code_depot && !validator.isInt(data.code_depot)) throw new ValidationError(`Invalid code_depot option – ${data.code_depot}`);
    if (data.dateFrom && !validator.matches(data.dateFrom, /\d{2}\/\d{2}\/\d{2}/i))
      throw new ValidationError(`Invalid dateFrom option – ${data.dateFrom}`);
    if (data.dateTo && !validator.matches(data.dateTo, /\d{2}\/\d{2}\/\d{2}/i)) throw new ValidationError(`Invalid dateTo option – ${data.dateTo}`);
  }
}
