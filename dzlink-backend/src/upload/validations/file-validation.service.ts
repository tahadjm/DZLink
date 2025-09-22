import { Injectable, BadRequestException } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';

@Injectable()
export class FileValidationService {
  /**
   * @param file Express.Multer.File
   */
  async validateImage(file: Express.Multer.File, maxSizeMb = 2): Promise<void> {
    if (!file) throw new BadRequestException('No file provided');
    if (file.size > maxSizeMb * 1024 * 1024) {
      throw new BadRequestException(`File too large (max ${maxSizeMb}MB)`);
    }

    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const detected = await fileTypeFromBuffer(file.buffer);

    if (!detected || !allowedMimes.includes(detected.mime)) {
      throw new BadRequestException('Invalid or unsupported image file');
    }
  }
}
