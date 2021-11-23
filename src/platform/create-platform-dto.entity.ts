import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsInt } from 'class-validator';

export class CreatePlatformDTO {
  @ApiProperty({
    description: 'The platform id',
    type: BigInt,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'The date when the platform is created',
    default: 'Current date',
    type: Date,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the platform is updated',
    default: 'Current date',
    type: Date,
  })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    description: '3 digits ISO country code (Example: ARG)',
    type: String,
  })
  @IsString()
  countryCode: string;

  @ApiProperty({
    description: '3 digits ISO currency code (Example: ARS)',
    type: String,
  })
  @IsString()
  currencyCode: string;

  @ApiProperty({
    description: '5 digits ISO language code (Example: es_AR)',
    type: String,
  })
  @IsString()
  langCode: string;

  @ApiProperty({
    description: 'Up to 5 digits phone code (Example: ++549)',
    type: String,
  })
  @IsString()
  phoneCountryCode: string;
}
