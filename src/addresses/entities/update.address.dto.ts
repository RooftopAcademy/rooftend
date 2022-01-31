import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateAddressDto {
    @IsString()
    @ApiProperty({
        description: 'City name',
        type: 'string',
        example: 'sasa sasa',
        maxLength: 100,
        nullable: false,
    })
    cityName: string;

    @IsString()
    @ApiProperty({
        description: 'Street name',
        type: 'string',
        example: '9 de Julio',
        maxLength: 200,
        nullable: false,
    })
    streetName: string;

    @IsString()
    @ApiProperty({
        description: 'Street number',
        type: 'integer',
        example: 3850,
        nullable: false,
    })
    streetNumber: number;

    @IsString()
    @ApiProperty({
        description: 'Zip code',
        type: 'string',
        example: 'X2400AIQ',
        nullable: false,
    })
    zipCode: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Floor number',
        type: 'small-integer',
        example: 8,
        default: null,
    })
    floor?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Office code',
        type: 'string',
        example: 'B',
        default: null,
    })
    office?: string

    @IsString()
    @IsOptional()
    @ApiProperty({
        description:
            'Indications about the house, apartment, neighborhood, streets, etc.',
        type: 'string',
        example: 'My house color is beige, with a black door.',
        default: null,
    })
    references?: string
}