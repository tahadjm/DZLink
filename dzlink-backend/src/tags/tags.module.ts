import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from '@/libs/schemas';
import { TagRepository } from '@/libs/repositories';
import { TagService } from './tags.service';
import { TagController } from './tags.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  controllers: [TagController],
  providers: [TagService, TagRepository], // ✅ repos + services
  exports: [TagRepository],
})
export class TagsModule {}
