import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateHistoryDto {
  @IsNumber()
  @ApiProperty({
    description: 'Unique identifier of the item',
    example: '1',
  })
  itemId: number;
}
