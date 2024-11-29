import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { FilterUserDto, SortUserDto } from '../dto/query-user.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

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

  async update(id: string, payload: Partial<User>): Promise<User | null> {

    const filter = { _id: id };
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
  
  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const where: FilterQuery<User> = {};
    if (filterOptions?.roles?.length) {
      where['role.id'] = {
        $in: filterOptions.roles.map((role) => role.id),
      };
    }

    const userObjects = await this.usersModel
      .find(where)
      .sort(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy]:
              sort.order.toUpperCase() === 'ASC' ? 1 : -1,
          }),
          {},
        ),
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return userObjects;
  }

  async remove(id: string): Promise<void> {
    await this.usersModel.deleteOne({
      _id: id,
    });
  }
}
