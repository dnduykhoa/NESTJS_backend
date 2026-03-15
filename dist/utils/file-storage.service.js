"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const uuid_1 = require("uuid");
let FileStorageService = class FileStorageService {
    constructor() {
        this.uploadDir = process.env.FILE_UPLOAD_DIR || path.join(process.cwd(), 'uploads');
    }
    storeFile(file, subDir) {
        const targetDir = path.join(this.uploadDir, subDir);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        const ext = path.extname(file.originalname).toLowerCase();
        const filename = `${(0, uuid_1.v4)()}${ext}`;
        const targetPath = path.join(targetDir, filename);
        fs.writeFileSync(targetPath, file.buffer);
        return `/images/${subDir}/${filename}`;
    }
    deleteFile(fileUrl) {
        if (!fileUrl)
            return;
        const relativePath = fileUrl.replace(/^\/images\//, '');
        const fullPath = path.join(this.uploadDir, relativePath);
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }
    }
    isImageFile(file) {
        const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
        return imageTypes.includes(file.mimetype);
    }
    isVideoFile(file) {
        const videoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
        return videoTypes.includes(file.mimetype);
    }
    isImageOrVideoFile(file) {
        return this.isImageFile(file) || this.isVideoFile(file);
    }
};
exports.FileStorageService = FileStorageService;
exports.FileStorageService = FileStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FileStorageService);
//# sourceMappingURL=file-storage.service.js.map