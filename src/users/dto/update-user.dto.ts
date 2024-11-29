import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

import { Transform, Type } from 'class-transformer';
import { IsEmail, IsOptional, MinLength, ValidateNested } from 'class-validator';
import { RoleDto } from '../../roles/dto/role.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ example: 'John', type: String })
  @IsOptional()
  name?: string | null;

  @ApiPropertyOptional({ type: () => RoleDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RoleDto)
  role?: RoleDto | null;
}
