import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateCartItemDTO {
  @Min(1)
  @ApiProperty({
    description: 'The items quantity',
    type: Number,
    minimum: 1,
  })
  @IsInt()
  quantity: number;

  @ApiProperty({
    description: 'Id of the item',
    type: Number,
    example: 1,
  })
  @IsInt()
  itemId: number;
}
