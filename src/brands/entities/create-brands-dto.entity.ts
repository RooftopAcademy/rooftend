import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class createBrandDTO {
  @IsNotEmpty()
  @IsString({
    message: 'NAME_MUST_BE_A_STRING',
  })
  @ApiProperty({
    example: 'Nike',
    description: 'The name of the brand',
    type: String,
    nullable: false,
    maxLength: 30,
  })
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @IsNotEmpty()
  @IsString({
    message: 'PHOTO_URL_MUST_BE_A_STRING',
  })
  @ApiProperty({
    example:
      'https://logos-marcas.com/wp-content/uploads/2020/04/Nike-Logo.png',
    description: 'The logo of the brand',
    type: String,
    nullable: false,
  })
  photoUrl: string;
}
