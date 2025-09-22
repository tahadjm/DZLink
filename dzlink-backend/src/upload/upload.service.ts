import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { STORAGE_PORT, StoragePort } from '@/libs/storage';
import sharp from 'sharp';
import { FileValidationService } from './validations/file-validation.service';

@Injectable()
export class UploadService {
  constructor(
    @Inject(STORAGE_PORT) private readonly storage: StoragePort,
    private readonly fileValidation: FileValidationService,
  ) {}

  /**
   * Upload and compress a single image
   */
  async uploadCompressedImage(file: Express.Multer.File): Promise<string> {
    await this.fileValidation.validateImage(file);

    // Compress with sharp
    const compressedBuffer = await sharp(file.buffer)
      .resize(800, 800, { fit: 'inside' }) // keep aspect ratio
      .toFormat('jpeg', { quality: 80 })
      .toBuffer();

    return this.storage.uploadFile({
      buffer: compressedBuffer,
      originalName: file.originalname,
      mimetype: 'image/jpeg',
      folder: 'images',
    });
  }

  /**
   * Upload multiple images
   */
  async uploadMultipleImages(files: Express.Multer.File[]): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
      const url = await this.uploadCompressedImage(file);
      urls.push(url);
    }

    return urls;
  }

  /**
   * Delete an image from storage
   */
  async deleteImage(key: string): Promise<void> {
    if (!key) throw new BadRequestException('File key is required');
    await this.storage.deleteFile(key);
  }
}
