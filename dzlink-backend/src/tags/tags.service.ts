import { Injectable, NotFoundException } from '@nestjs/common';
import { TagRepository } from '@/libs/repositories/';
import { CreateTagDto } from './dto/';
import { UpdateTagDto } from './dto/';

@Injectable()
export class TagService {
  constructor(private readonly tagRepo: TagRepository) {}

  async create(dto: CreateTagDto) {
    return await this.tagRepo.create(dto);
  }

  async findAll() {
    return await this.tagRepo.findAllTags();
  }

  async findByName(name: string) {
    const tag = await this.tagRepo.findTagByName(name);
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async update(id: string, dto: UpdateTagDto) {
    const tag = await this.tagRepo.update(id, dto);
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async remove(id: string) {
    const tag = await this.tagRepo.delete(id);
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }
}
