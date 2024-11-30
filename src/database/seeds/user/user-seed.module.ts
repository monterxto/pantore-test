import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSeedService } from './user-seed.service';
import {
  User,
  UserSchema,
} from '../../../users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserSeedService]
})
export class UserSeedModule {}
