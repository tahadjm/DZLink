import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CitesService } from './cities.service';

@ApiTags('Cities')
@Controller('cities')
export class CityController {
  constructor(private readonly citiesService: CitesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new city' })
  @ApiResponse({ status: 201, description: 'City created.' })
  create(@Body() dto: CreateCityDto) {
    return this.citiesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cities' })
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get city by name' })
  findByName(@Param('name') name: string) {
    return this.citiesService.findByName(name);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update city by id' })
  update(@Param('id') id: string, @Body() dto: UpdateCityDto) {
    return this.citiesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete city by id' })
  remove(@Param('id') id: string) {
    return this.citiesService.remove(id);
  }
}
