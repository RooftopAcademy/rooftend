import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDTO {
  @IsString()
  @ApiProperty({
    type: String,
    description: "Item's title"
  })
  title: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: "Item's description"
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: "Item's price"
  })
  price: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: "Item's current stock"
  })
  stock: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: "Item's brand"
  })
  brand?: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: "Item's category"
  })
  category: number;
}
