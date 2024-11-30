import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { RoleEnum } from '../../../roles/roles.enum';
import { User } from '../../../users/entities/user.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectModel(User.name)
    private readonly model: Model<User>,
  ) {}

  async run() {
    const admin = await this.model.findOne({
      email: 'admin@example.com',
    });

    if (!admin) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      const data = new this.model({
        email: 'admin@example.com',
        password: password,
        name: 'Super',
        role: {
          id: RoleEnum.admin.toString(),
        }
      });
      await data.save();
    }

    const user = await this.model.findOne({
      email: 'john.doe@example.com',
    });

    if (!user) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      const data = new this.model({
        email: 'john.doe@example.com',
        password: password,
        name: 'John',
        role: {
          id: RoleEnum.user.toString(),
        }
      });

      await data.save();
    }
  }
}
