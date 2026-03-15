export declare class ApiResponse<T = any> {
    message: string;
    data: T | null;
    constructor(message: string, data?: T | null);
}
