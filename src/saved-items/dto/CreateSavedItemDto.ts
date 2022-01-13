import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateSavedItemDto {

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'The id of the item',
    type: 'bigint',
    nullable: false,
  })
  itemId: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'The id of the user',
    type: 'bigint',
    nullable: false,
  })
  userId: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'The id of the user',
    type: 'int',
    nullable: false,
  })
  quantity: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'The id of the user',
    type: 'int',
    nullable: false,
  })
  price: number;
}
