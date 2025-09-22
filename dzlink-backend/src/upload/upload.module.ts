import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { STORAGE_PORT } from '@/libs/storage/';
import { LocalStorageAdapter } from '@/libs/storage';
import { FileValidationService } from './validations/file-validation.service';

@Module({
  controllers: [UploadController],
  providers: [
    UploadService,
    FileValidationService,
    {
      provide: STORAGE_PORT,
      useClass: LocalStorageAdapter, // 👈 Local instead of S3
    },
  ],
  exports: [UploadService, FileValidationService],
})
export class UploadModule {}
