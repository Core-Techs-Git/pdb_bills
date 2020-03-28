/**
 * @module error
 * @packageDocumentation
 */

import {BillError} from '@/error/BillError';

export class AuthenticationError extends BillError {
  constructor(info: string | Error | null) {
    super(info);
    if (!info) this.message = 'Authentication failed.';
  }
}
