export declare class FileStorageService {
    private readonly uploadDir;
    constructor();
    storeFile(file: Express.Multer.File, subDir: string): string;
    deleteFile(fileUrl: string): void;
    isImageFile(file: Express.Multer.File): boolean;
    isVideoFile(file: Express.Multer.File): boolean;
    isImageOrVideoFile(file: Express.Multer.File): boolean;
}
