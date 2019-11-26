import {BillError} from '@pdb_bills/services/error/BillError';

export class AuthenticationError extends BillError {
  constructor(info: string | Error | null) {
    super(info);
    if (!info) this.message = 'Authentication failed.';
  }
}
