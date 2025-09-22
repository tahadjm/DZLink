/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from '@/libs/schemas';

@Injectable()
export class AdminsRepository {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
  ) {}

  async findByEmail(email: string): Promise<AdminDocument | null> {
    return this.adminModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async createAdmin(admin: Partial<Admin>): Promise<AdminDocument> {
    return this.adminModel.create(admin);
  }

  async findById(id: string): Promise<AdminDocument | null> {
    return this.adminModel.findById(id).exec();
  }
}
