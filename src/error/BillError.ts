/**
 * @module error
 * @packageDocumentation
 */

export class BillError extends Error {
  constructor(info?: string | Error) {
    if (typeof info === 'string') super(info);
    else super(info.message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
