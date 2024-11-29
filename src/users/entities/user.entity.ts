import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument, Types } from 'mongoose';

import { Exclude, Expose, Type } from 'class-transformer';
import { Role } from '../../roles/entities/role.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class User {
  _id?: Types.ObjectId | null

  @ApiResponseProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Prop({
    type: String,
    unique: true,
  })
  @Expose({ groups: ['me', 'admin'], toPlainOnly: true })
  email: string | null;

  @ApiResponseProperty({
    type: String,
    example: 'John',
  })
  @Prop({
    type: String,
  })
  name: string | null;

  @ApiResponseProperty({
    type: () => Role,
  })
  @Prop({
    type: Role,
  })
  role?: Role | null;

  @Exclude({ toPlainOnly: true })
  @Prop()
  password?: string;

  @ApiResponseProperty()
  @Prop({ default: now })
  createdAt?: Date;

  @ApiResponseProperty()
  @Prop({ default: now })
  updatedAt?: Date;

  @ApiResponseProperty()
  @Prop()
  deletedAt?: Date;
}

export type UserSchemaDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ 'role.id': 1 });
