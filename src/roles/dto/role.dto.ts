import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class RoleDto {
  @ApiProperty()
  @IsNumberString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;
}
