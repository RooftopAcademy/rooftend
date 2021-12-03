import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt } from 'class-validator';

export class CreateCartItemDTO {
  @ApiProperty({
    description: 'The items quantity',
    type: Number,
  })
  @IsInt()
  quantity?: number;

  @ApiProperty({
    description: 'The Cart Item subtotal',
    type: Number,
  })
  @IsInt()
  subtotal?: number;
}
