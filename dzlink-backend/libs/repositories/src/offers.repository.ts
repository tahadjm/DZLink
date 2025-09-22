import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from '@/libs/repositories';
import { Offer, OfferDocument } from '@/libs/schemas/src/offers.schema';

@Injectable()
export class OffersRepository extends GenericRepository<OfferDocument> {
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<OfferDocument>,
  ) {
    super(offerModel);
  }

  async findAll(): Promise<OfferDocument[]> {
    return this.offerModel.find().exec();
  }

  async findByUser(userId: string): Promise<OfferDocument[]> {
    return this.offerModel.find({ userId }).exec();
  }

  async create(offer: Partial<Offer>): Promise<OfferDocument> {
    return this.offerModel.create(offer);
  }
  async update(id: string, offer: Partial<Offer>): Promise<OfferDocument> {
    return this.offerModel.findByIdAndUpdate(id, offer, { new: true }).exec();
  }
  async delete(id: string): Promise<OfferDocument> {
    return this.offerModel.findByIdAndDelete(id).exec();
  }
}
