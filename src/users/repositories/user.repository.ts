import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<User>,
  ) { }

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

  async update(id: User['_id'], payload: Partial<User>): Promise<User | null> {

    const filter = { _id: id.toString() };
    const user = (await this.usersModel.findOne(filter)).toJSON();

    if (!user) {
      return null;
    }

    const userObject = await this.usersModel.findOneAndUpdate(
      filter,
      {
        ...user,
        ...payload,
      },
      { new: true },
    );

    return userObject || null;
  }

  async remove(id: string): Promise<void> {
    await this.usersModel.deleteOne({
      _id: id.toString(),
    });
  }
}
