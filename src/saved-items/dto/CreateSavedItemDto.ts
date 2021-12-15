import { ApiProperty } from '@nestjs/swagger';

export class CreateSavedItemDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the item',
    type: 'bigint',
    nullable: false,
  })
  itemId: number;

  @ApiProperty({
    example: 1,
    description: 'The id of the user',
    type: 'bigint',
    nullable: false,
  })
  userId: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'The id of the user',
    type: 'int',
    nullable: false,
  })
  quantity: number;

  @ApiProperty({
    example: 1,
    description: 'The id of the user',
    type: 'int',
    nullable: false,
  })
  price: number;
}
