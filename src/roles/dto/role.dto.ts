import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class RoleDto {
  @ApiProperty()
  @IsNumberString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
}
