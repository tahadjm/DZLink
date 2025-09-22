import { Injectable, NotFoundException } from '@nestjs/common';
import { CityRepository } from '@/libs/repositories/';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitesService {
  constructor(private readonly cityRepo: CityRepository) {}

  async create(dto: CreateCityDto) {
    return await this.cityRepo.create(dto);
  }

  async findAll() {
    return await this.cityRepo.findAllCities();
  }

  async findByName(name: string) {
    const city = await this.cityRepo.findCityByName(name);
    if (!city) throw new NotFoundException('City not found');
    return city;
  }

  async update(id: string, dto: UpdateCityDto) {
    const city = await this.cityRepo.update(id, dto);
    if (!city) throw new NotFoundException('City not found');
    return city;
  }

  async remove(id: string) {
    const city = await this.cityRepo.delete(id);
    if (!city) throw new NotFoundException('City not found');
    return city;
  }
}
