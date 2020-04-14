export declare abstract class Validator implements ValidatorInterface {
    abstract validate<T>(data: T): void;
}
export interface ValidatorInterface {
    validate<T>(data: T): void;
}
