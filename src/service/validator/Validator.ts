/**
 * @module service
 * @packageDocumentation
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import {injectable} from 'inversify';

/**
 * Provid an api to validate data.
 */
@injectable()
export abstract class Validator implements ValidatorInterface {
  public abstract validate<T>(data: T): void;
}

/**
 * Data validator.
 */
export interface ValidatorInterface {
  /**
   * Validate a provided data.
   * @param {T} data The data that need to be validate.
   */
  validate<T>(data: T): void;
}
