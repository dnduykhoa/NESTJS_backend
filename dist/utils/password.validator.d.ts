export declare class PasswordValidator {
    private static readonly MIN_LENGTH;
    private static readonly UPPERCASE_PATTERN;
    private static readonly LOWERCASE_PATTERN;
    private static readonly DIGIT_PATTERN;
    private static readonly SPECIAL_CHAR_PATTERN;
    validate(password: string): void;
    isValid(password: string): boolean;
}
