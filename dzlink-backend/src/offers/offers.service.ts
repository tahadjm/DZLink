import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OffersRepository } from '@/libs/repositories';
import { Types } from 'mongoose';

@Injectable()
export class OffersService {
  constructor(private readonly offersRepo: OffersRepository) {}

  async create(userId: string, dto: CreateOfferDto) {
    return await this.offersRepo.create({
      ...dto,
      userId: new Types.ObjectId(userId),
    });
  }

  async findAll() {
    return await this.offersRepo.findAll();
  }

  async findById(id: string) {
    const offer = await this.offersRepo.findById(id);
    if (!offer) throw new NotFoundException('Offer not found');
    return offer;
  }

  async findByUser(userId: string) {
    return await this.offersRepo.findByUser(userId);
  }

  async update(userId: string, id: string, dto: UpdateOfferDto) {
    const offer = await this.offersRepo.findById(id);
    if (!offer) throw new NotFoundException('Offer not found');
    if (offer.userId.toString() !== userId.toString()) {
      throw new ForbiddenException('You cannot update this offer');
    }
    return this.offersRepo.update(id, dto);
  }

  async delete(userId: string, id: string) {
    const offer = await this.offersRepo.findById(id);
    if (!offer) throw new NotFoundException('Offer not found');

    if (offer.userId.toString() !== userId.toString()) {
      throw new ForbiddenException('You cannot delete this offer');
    }
    return this.offersRepo.delete(id);
  }
}
