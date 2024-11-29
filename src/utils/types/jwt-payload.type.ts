import { User } from "../../users/entities/user.entity";

export type JwtPayloadType = Pick<User, '_id' | 'role'> & {
  iat: number;
  exp: number;
};
