export declare class PhoneValidator {
    private static readonly PHONE_REGEX;
    static normalize(phone: string): string;
    static isValid(phone: string): boolean;
    validate(phone: string): void;
}
