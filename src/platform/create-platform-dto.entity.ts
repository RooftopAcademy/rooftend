import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsInt } from 'class-validator';

export class CreatePlatformDTO {
  @ApiProperty({
    description: '3 digits ISO country code (Example: ARG)',
    type: 'string',
  })
  @IsString()
  countryCode: string;

  @ApiProperty({
    description: '3 digits ISO currency code (Example: ARS)',
    type: 'string',
  })
  @IsString()
  currencyCode: string;

  @ApiProperty({
    description: '5 digits ISO language code (Example: es_AR)',
    type: 'string',
  })
  @IsString()
  langCode: string;

  @ApiProperty({
    description: 'Up to 5 digits phone code (Example: ++549)',
    type: 'string',
  })
  @IsString()
  phoneCountryCode: string;
}
