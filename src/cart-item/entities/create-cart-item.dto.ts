import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, Min } from 'class-validator';

export class CreateCartItemDTO {
  @Min(1)
  @ApiProperty({
    description: 'The items quantity',
    type: Number,
    minimum: 1,
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
