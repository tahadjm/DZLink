import { Injectable, NotFoundException } from '@nestjs/common';
import {
  UsersRepository,
  SponsorshipRecordsRepository,
} from '@/libs/repositories';
import { UploadService } from '@/src/upload/upload.service';
import { FileValidationService } from '../upload/validations/file-validation.service';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly uploadService: UploadService,
    private readonly fileValidation: FileValidationService,
    private readonly recordsRepo: SponsorshipRecordsRepository,
  ) {}

  async getMe(email: string) {
    const user = await this.usersRepo.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user.toObject();
  }

  async uploadAvatar(email: string, file: Express.Multer.File) {
    await this.fileValidation.validateImage(file);

    const url = await this.uploadService.uploadCompressedImage(file);

    const updated = await this.usersRepo.updateUser(email, {
      avatarUrl: url,
    });

    if (!updated) throw new NotFoundException('User not found');

    return { profileImageUrl: url };
  }

  async getAllUsersWithSponsorshipStatus() {
    const users = await this.usersRepo.findAll();
    const sponsoredUserIds =
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      (await this.recordsRepo.findDistinctUserIds()) as Types.ObjectId[];

    const sponsored = users.filter((u) =>
      sponsoredUserIds.some(
        (id) => id.toString() === (u._id as Types.ObjectId).toString(),
      ),
    );

    const unsponsored = users.filter(
      (u) =>
        !sponsoredUserIds.some(
          (id) => id.toString() === (u._id as Types.ObjectId).toString(),
        ),
    );

    return {
      all: users,
      sponsored,
      unsponsored,
    };
  }
}
