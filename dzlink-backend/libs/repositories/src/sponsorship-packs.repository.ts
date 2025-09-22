import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SponsorshipPack, SponsorshipPackDocument } from '@/libs/schemas/';

@Injectable()
export class SponsorshipPacksRepository {
  constructor(
    @InjectModel(SponsorshipPack.name)
    private readonly packModel: Model<SponsorshipPackDocument>,
  ) {}

  async findAll() {
    return this.packModel.find().lean();
  }

  async findById(id: string) {
    return this.packModel.findById(new Types.ObjectId(id)).exec();
  }

  async create(data: Partial<SponsorshipPack>) {
    return this.packModel.create(data);
  }

  async update(id: string, data: Partial<SponsorshipPack>) {
    return this.packModel.findOneAndUpdate({ id }, data, { new: true });
  }

  async delete(id: string): Promise<{ deletedCount?: number }> {
    const result = await this.packModel.deleteOne({ id });
    return { deletedCount: result.deletedCount };
  }
}
