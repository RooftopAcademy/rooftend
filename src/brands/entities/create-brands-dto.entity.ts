import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createBrandDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '',
    description: 'The name of the brand',
    type: String,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '',
    description: 'The logo of the brand',
    type: String,
  })
  photoId: string;
}
