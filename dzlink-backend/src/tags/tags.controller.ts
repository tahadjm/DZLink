import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { TagService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto';

@ApiTags('Tags')
@ApiBearerAuth()
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiBody({ type: CreateTagDto })
  @ApiResponse({
    status: 201,
    description: 'Tag created successfully',
    schema: {
      example: { id: '650af9b87d1f2b001f8e1234', name: 'React' },
    },
  })
  async create(@Body() dto: CreateTagDto) {
    return this.tagService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({
    status: 200,
    description: 'List of tags',
    schema: {
      type: 'array',
      items: { type: 'object', properties: { name: { type: 'string' } } },
    },
  })
  async findAll() {
    return this.tagService.findAll();
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get a tag by name' })
  @ApiResponse({
    status: 200,
    description: 'Tag found',
    schema: { example: { id: '650af9b87d1f2b001f8e1234', name: 'React' } },
  })
  async findByName(@Param('name') name: string) {
    return await this.tagService.findByName(name);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tag by id' })
  @ApiBody({ type: UpdateTagDto })
  @ApiResponse({
    status: 200,
    description: 'Tag updated successfully',
    schema: { example: { id: '650af9b87d1f2b001f8e1234', name: 'Next.js' } },
  })
  async update(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    return await this.tagService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a tag by id' })
  @ApiResponse({ status: 204, description: 'Tag deleted successfully' })
  async remove(@Param('id') id: string) {
    return await this.tagService.remove(id);
  }
}
