import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CityDocument, City } from 'libs/schemas';
import { CreateCityDto } from '@/src/cities/dto/';
import { GenericRepository } from '@/libs/repositories';

@Injectable()
export class CityRepository extends GenericRepository<CityDocument> {
  constructor(
    @InjectModel(City.name)
    private readonly cityModel: Model<CityDocument>,
  ) {
    super(cityModel);
  }

  async findCityByName(name: string): Promise<CityDocument | null> {
    return this.cityModel
      .findOne({ name: new RegExp(`^${name}$`, 'i') })
      .exec();
  }
  async findAllCities(): Promise<CityDocument[]> {
    return this.cityModel.find().exec();
  }
  async createCity(dto: CreateCityDto): Promise<CityDocument> {
    return this.cityModel.create(dto);
  }
}
