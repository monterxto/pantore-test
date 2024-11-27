import { ApiResponseProperty } from '@nestjs/swagger';

export class Role {
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @ApiResponseProperty({
    type: String,
    example: 'admin',
  })
  name: string;
}
