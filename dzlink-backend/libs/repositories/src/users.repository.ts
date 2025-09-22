import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';

import { User, UserDocument } from 'libs/schemas';
import { GenericRepository } from './generic.repository';

@Injectable()
export class UsersRepository extends GenericRepository<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async findByEmail(email: string, selectPassword = false) {
    return this.userModel
      .findOne(
        { email: email.toLowerCase() },
        selectPassword ? '+password' : undefined,
      )
      .exec();
  }

  async findAll() {
    return this.userModel.find().select('+city +tags +phone +bio').exec();
  }

  async createUser(user: Partial<User>): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  async updateUser(email: string, update: Partial<User>) {
    return this.userModel
      .findOneAndUpdate(
        { email: email.toLowerCase() },
        { $set: update },
        { new: true },
      )
      .populate('city')
      .populate('tags')
      .exec();
  }

  async deleteUser(email: string) {
    return this.userModel
      .findOneAndDelete({ email: email.toLowerCase() })
      .populate('city')
      .populate('tags')
      .exec();
  }

  async updatePassword(email: string, newPassword: string) {
    const hash = await argon2.hash(newPassword);
    return this.userModel
      .findOneAndUpdate(
        { email: email.toLowerCase() },
        { $set: { password: hash } },
        { new: true },
      )
      .populate('city')
      .populate('tags')
      .exec();
  }
}
