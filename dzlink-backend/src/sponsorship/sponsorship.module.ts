import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SponsorshipPack, SponsorshipPackSchema } from '@/libs/schemas';
import { SponsorshipRecord, SponsorshipRecordSchema } from '@/libs/schemas';

import { SponsorshipPacksRepository } from '@/libs/repositories';
import { SponsorshipRecordsRepository } from '@/libs/repositories';

import { SponsorshipService } from './sponsorship.service';
import { SponsorshipController } from './sponsorship.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SponsorshipPack.name, schema: SponsorshipPackSchema },
      { name: SponsorshipRecord.name, schema: SponsorshipRecordSchema },
    ]),
  ],
  controllers: [SponsorshipController],
  providers: [
    SponsorshipPacksRepository,
    SponsorshipRecordsRepository,
    SponsorshipService,
  ],
  exports: [
    SponsorshipService,
    SponsorshipPacksRepository, // <--- export repos
    SponsorshipRecordsRepository, // <--- export repos
  ],
})
export class SponsorshipModule {}
