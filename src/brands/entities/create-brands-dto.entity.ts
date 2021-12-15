import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class createBrandDTO {

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
