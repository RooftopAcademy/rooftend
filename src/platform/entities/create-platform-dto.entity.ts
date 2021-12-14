import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePlatformDTO {
  @ApiProperty({
    description: '3 digits ISO country code (Example: ARG)',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @ApiProperty({
    description: '3 digits ISO currency code (Example: ARS)',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  currencyCode: string;

  @ApiProperty({
    description: '5 digits ISO language code (Example: es_AR)',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  langCode: string;

  @ApiProperty({
    description: 'Up to 5 digits phone code (Example: ++549)',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  phoneCountryCode: string;
}
