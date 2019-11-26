import { BillError } from '@pdb_bills/services/error/BillError';
export declare class AuthenticationError extends BillError {
    constructor(info: string | Error | null);
}
