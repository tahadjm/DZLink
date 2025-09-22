import { Injectable, NotFoundException } from '@nestjs/common';
import {
  SponsorshipPacksRepository,
  SponsorshipRecordsRepository,
} from '@/libs/repositories';
import { Types } from 'mongoose';
import {
  CreatePackDto,
  UpdatePackDto,
  CreateRecordDto,
  UpdateRecordDto,
} from './dto';

@Injectable()
export class SponsorshipService {
  constructor(
    private readonly packsRepo: SponsorshipPacksRepository,
    private readonly recordsRepo: SponsorshipRecordsRepository,
  ) {}

  // Packs
  getAllPacks() {
    return this.packsRepo.findAll();
  }

  getPack(id: string) {
    return this.packsRepo.findById(id);
  }

  createPack(dto: CreatePackDto) {
    return this.packsRepo.create(dto);
  }

  updatePack(id: string, dto: UpdatePackDto) {
    return this.packsRepo.update(id, dto);
  }

  deletePack(id: string) {
    return this.packsRepo.delete(id);
  }

  // Records
  getAllRecords() {
    return this.recordsRepo.findAll();
  }

  getUserRecords(userId: string) {
    return this.recordsRepo.findByUser(new Types.ObjectId(userId));
  }

  async createRecord(dto: CreateRecordDto, userId: string) {
    const pack = await this.packsRepo.findById(dto.packId);
    if (!pack) throw new NotFoundException('Pack not found');

    const data = {
      userId: new Types.ObjectId(userId),
      packId: new Types.ObjectId(pack.id), // ✅ ensure ObjectId type
      packKey: pack.key,
      startDate: new Date(),
      endDate: new Date(Date.now() + pack.durationDays * 24 * 60 * 60 * 1000),
      status: 'active',
    };

    return this.recordsRepo.create(data);
  }

  updateRecord(id: string, dto: UpdateRecordDto, userId: string) {
    const data: any = { ...dto };

    if (userId) {
      data.userId = new Types.ObjectId(userId);
    }

    if (dto.packId) {
      data.packId = new Types.ObjectId(dto.packId);
    }

    return this.recordsRepo.update(id, data);
  }
  deleteRecord(id: string) {
    return this.recordsRepo.delete(id);
  }
}
