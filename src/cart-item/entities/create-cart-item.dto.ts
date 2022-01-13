import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateCartItemDTO {
  @ApiProperty({
    description: 'The items quantity',
    type: Number,
  })
  @IsInt()
  quantity?: number;
}
