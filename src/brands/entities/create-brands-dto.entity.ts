import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class createBrandDTO {
  @IsInt()
  @ApiProperty({
    example: 123,
    description: 'The id of the brand',
    type: Number,
  })
  id: number;

  @IsString()
  @ApiProperty({
    example: '',
    description: 'The name of the brand',
    type: String,
  })
  name: string;

  @IsInt()
  @ApiProperty({
    example: 123,
    description: 'The logo of the brand',
    type: Number,
  })
  photoId: number;
}
