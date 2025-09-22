import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TagDocument, Tag } from 'libs/schemas';
import { CreateTagDto } from '@/src/tags/dto';
import { GenericRepository } from './generic.repository';

@Injectable()
export class TagRepository extends GenericRepository<TagDocument> {
  constructor(
    @InjectModel(Tag.name)
    private readonly TagModel: Model<TagDocument>,
  ) {
    super(TagModel);
  }

  async findTagByName(name: string): Promise<TagDocument | null> {
    return this.TagModel.findOne({ name: new RegExp(`^${name}$`, 'i') }).exec();
  }
  async findAllTags(): Promise<TagDocument[]> {
    return this.TagModel.find().exec();
  }
  async createTag(dto: CreateTagDto): Promise<TagDocument> {
    return this.TagModel.create(dto);
  }
}
