import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<User>,
  ) {}

  async create(data: User): Promise<User> {
    const createdUser = new this.usersModel(data);
    const userObject = await createdUser.save();
    return userObject;
  }

  async findById(id: string): Promise<User> {
    const userObject = await this.usersModel.findById(id);
    return userObject || null;
  }

  async findByEmail(email: string): Promise<User> {
    if (!email) return null;

    const userObject = await this.usersModel.findOne({ email });
    return userObject || null;
  }

  async remove(id: string): Promise<void> {
    await this.usersModel.deleteOne({
      _id: id.toString(),
    });
  }
}
