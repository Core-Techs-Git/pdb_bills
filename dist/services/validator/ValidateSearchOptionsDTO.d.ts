import { ValidatorInterface } from '.';
/**
 * Validator for SearchOptionsDTO.
 */
export declare class ValidateSearchOptionsDTO implements ValidatorInterface {
    isValid<T>(data: T): boolean;
    /**
     * Makes sure that data is a type of SearchOptionsDTO.
     * @param {any} data The data that need to be validate.
     * @returns {boolean} True if provided data is type of SearchOptionsDTO.
     */
    private isValidSearchOptionsDTO;
}
