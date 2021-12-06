import { ApiProperty } from '@nestjs/swagger';

export class UpdateSavedItemDto {
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
