export class BillError extends Error {
  constructor(info?: string | Error) {
    if (typeof info === 'string') super(info);
    else if (info instanceof Error) super(info.message);
    else super('An unidentify error occured.');

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
