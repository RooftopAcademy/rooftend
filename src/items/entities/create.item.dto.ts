import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @Length(1, 100)
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
    description: 'Item title',
  })
  title: string;

  @IsString()
  @Length(1, 1000)
  @ApiProperty({
    example: 'Imitaciones de varitas de sauco para el mago coleccionista',
    description: 'Item description',
  })
  description: string;

  @IsNumber()
  @Min(0)
  @Max(100000000)
  @ApiProperty({
    example: 1050.99,
    description: 'Item Price',
  })
  price: number;

  @IsNumber()
  @Min(1)
  @Max(100000000)
  @ApiProperty({
    example: 10,
    description: 'Item Stock',
  })
  stock: number;

  @IsNumber()
  @ApiProperty({
    description: 'Id of the item category',
    example: 1,
  })
  categoryId: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Id of the item brand',
    example: 1,
  })
  brandId?: number;
}
