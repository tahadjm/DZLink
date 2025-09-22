import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
  SponsorshipRecord,
  SponsorshipRecordSchema,
} from '@/libs/schemas';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  SponsorshipRecordsRepository,
  UsersRepository,
} from '@/libs/repositories';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    UploadModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: SponsorshipRecord.name, schema: SponsorshipRecordSchema }, // 👈 add this
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, SponsorshipRecordsRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
