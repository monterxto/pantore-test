import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateNested } from 'class-validator';
import { RoleDto } from '../../roles/dto/role.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  name: string | null;
  
  @ApiProperty()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RoleDto)
  role?: RoleDto | null;
}
