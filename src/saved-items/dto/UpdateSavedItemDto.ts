import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateSavedItemDto {

  @Min(1)
  @IsNumber()
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'The id of the user',
    type: Number,
    nullable: false,
  })
  quantity: number;

  @IsNumber()
  @ApiProperty({
    example: 6.99,
    description: 'The id of the user',
    type: Number,
    nullable: false,
  })
  price: number;
}
