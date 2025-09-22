import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { Offer, OfferSchema } from '@/libs/schemas';
import { OffersRepository } from '@/libs/repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }]),
  ],
  providers: [OffersService, OffersRepository],
  controllers: [OffersController],
  exports: [OffersRepository],
})
export class OffersModule {}
