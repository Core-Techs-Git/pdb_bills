export * from './ValidateSearchOptionsDTO';
/**
 * Data validator.
 */
export interface ValidatorInterface {
    /**
     * Verify wether an object is a valid type of SearchOptionsDTO.
     * @param {T} data The data that need to be validate.
     * @returns {boolean} True if the data is a valid type of SearchOptionsDTO.
     */
    isValid<T>(data: T): boolean;
}
