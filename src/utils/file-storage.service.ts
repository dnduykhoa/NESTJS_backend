import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileStorageService {
  private readonly uploadDir: string;

  constructor() {
    this.uploadDir = process.env.FILE_UPLOAD_DIR || path.join(process.cwd(), 'uploads');
  }

  /**
   * Lưu file với tên UUID vào thư mục con
   * @param file  Multer file object
   * @param subDir  'brands' | 'products' | 'carousel' | 'avatars'
   * @returns Đường dẫn tương đối (VD: /images/brands/uuid.jpg)
   */
  storeFile(file: Express.Multer.File, subDir: string): string {
    const targetDir = path.join(this.uploadDir, subDir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${uuidv4()}${ext}`;
    const targetPath = path.join(targetDir, filename);

    fs.writeFileSync(targetPath, file.buffer);

    return `/images/${subDir}/${filename}`;
  }

  /**
   * Xóa file theo đường dẫn URL (VD: /images/brands/uuid.jpg)
   */
  deleteFile(fileUrl: string): void {
    if (!fileUrl) return;
    // Chuyển URL path → đường dẫn filesystem
    const relativePath = fileUrl.replace(/^\/images\//, '');
    const fullPath = path.join(this.uploadDir, relativePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }

  isImageFile(file: Express.Multer.File): boolean {
    const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
    return imageTypes.includes(file.mimetype);
  }

  isVideoFile(file: Express.Multer.File): boolean {
    const videoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
    return videoTypes.includes(file.mimetype);
  }

  isImageOrVideoFile(file: Express.Multer.File): boolean {
    return this.isImageFile(file) || this.isVideoFile(file);
  }
}
