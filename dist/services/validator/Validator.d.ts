/**
 * Provid an api to validate data.
 */
export declare abstract class Validator implements ValidatorInterface {
    abstract validate<T>(data: T): void;
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
