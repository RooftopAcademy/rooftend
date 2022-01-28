import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @IsNumber()
  @ApiProperty({
    example: '1',
    description: 'represents the unique identifier of the item',
  })
  itemId: number;
}
