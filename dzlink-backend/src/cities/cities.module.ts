import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from '@/libs/schemas';
import { CityRepository } from '@/libs/repositories';
import { CityController } from './cities.controller';
import { CitesService } from './cities.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  controllers: [CityController],
  providers: [CitesService, CityRepository],
  exports: [CityRepository],
})
export class CitiesModule {}
