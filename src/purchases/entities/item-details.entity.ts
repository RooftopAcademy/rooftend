import { ApiProperty } from '@nestjs/swagger';

export class ItemDetails {
  @ApiProperty({
    name: 'title',
    type: 'string',
    example: 'Fancy TV 40 inches',
  })
  title: string;

  @ApiProperty({
    name: 'price',
    type: 'number',
    format: 'float',
    example: 2536.25,
  })
  price: number;

  @ApiProperty({
    name: 'quantity',
    type: 'number',
    format: 'integer',
    example: 1369,
  })
  quantity: number;

  @ApiProperty({
    name: 'photo',
    type: 'string',
    example: 'www.photodelivery.com/40inchesTV',
  })
  photo: string;
}
