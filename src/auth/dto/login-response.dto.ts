import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class LoginResponseDto {
  @ApiResponseProperty()
  token: string;

  @ApiResponseProperty()
  tokenExpires: number;

  @ApiResponseProperty({
    type: () => User,
  })
  user: User;
}
