import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SponsorshipRecord, SponsorshipRecordDocument } from '@/libs/schemas/';

@Injectable()
export class SponsorshipRecordsRepository {
  constructor(
    @InjectModel(SponsorshipRecord.name)
    private readonly recordModel: Model<SponsorshipRecordDocument>,
  ) {}

  async findAll() {
    return this.recordModel.find().populate('packId').lean();
  }

  async findDistinctUserIds(): Promise<Types.ObjectId[]> {
    return this.recordModel.distinct('userId').exec();
  }

  async findByUser(userId: Types.ObjectId) {
    return this.recordModel.find({ userId }).populate('packId').lean();
  }

  async create(data: Partial<SponsorshipRecord>) {
    return this.recordModel.create(data);
  }

  async update(id: string, data: Partial<SponsorshipRecord>) {
    return this.recordModel.findOneAndUpdate({ id }, data, { new: true });
  }

  async delete(id: string): Promise<{ deletedCount?: number }> {
    const result = await this.recordModel.deleteOne({ id });
    return { deletedCount: result.deletedCount };
  }
}
