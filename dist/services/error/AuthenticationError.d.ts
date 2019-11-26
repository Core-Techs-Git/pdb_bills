import { BillError } from './BillError';
export declare class AuthenticationError extends BillError {
    constructor(info: string | Error | null);
}
