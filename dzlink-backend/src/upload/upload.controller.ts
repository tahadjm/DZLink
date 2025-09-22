import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';

const MAX_IMAGE_SIZE_MB = 10;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * Upload a single image
   */
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a single image (local storage)' })
  @ApiResponse({
    status: 200,
    description: 'Image uploaded successfully',
    schema: {
      example: { url: '/uploads/images/uuid-filename.jpg' },
    },
  })
  async uploadSingleImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    if (!file) throw new BadRequestException('No file uploaded');
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      throw new BadRequestException(
        `File is too large. Max size is ${MAX_IMAGE_SIZE_MB}MB`,
      );
    }
    const url = await this.uploadService.uploadCompressedImage(file);
    return { url };
  }

  /**
   * Upload multiple images
   */
  @Post('images')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload multiple images (local storage)' })
  @ApiResponse({
    status: 200,
    description: 'Images uploaded successfully',
    schema: {
      example: {
        urls: ['/uploads/images/uuid1.jpg', '/uploads/images/uuid2.jpg'],
      },
    },
  })
  async uploadMultipleImages(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<{ urls: string[] }> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    const invalidFiles = files.filter(
      (file) => file.size > MAX_IMAGE_SIZE_BYTES,
    );
    if (invalidFiles.length > 0) {
      throw new BadRequestException(
        `Some files are too large. Each file must be under ${MAX_IMAGE_SIZE_MB}MB`,
      );
    }
    const urls = await this.uploadService.uploadMultipleImages(files);
    return { urls };
  }
}
