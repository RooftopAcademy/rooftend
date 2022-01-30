import { ApiProperty } from "@nestjs/swagger"
import { 
    IsNumber, 
    IsOptional, 
    IsString, 
    Length, 
} from "class-validator"

export class CreateAddressDto {
    @IsString()
    @Length(1, 3)
    @ApiProperty({
        description: '3 digits ISO country code',
        type: 'string',
        example: 'ARG',
        maxLength: 3,
        nullable: false,
    })
    countryCode: string

    @IsString()
    @Length(1, 100)
    @ApiProperty({
        description: 'Country state name',
        type: 'string',
        example: 'Córdoba',
        maxLength: 100,
        nullable: false,
    })
    countryState: string

    @IsString()
    @Length(1, 100)
    @ApiProperty({
        description: 'City name',
        type: 'string',
        example: 'San Francisco',
        maxLength: 100,
        nullable: false,
    })
    cityName: string

    @IsString()
    @Length(1, 200)
    @ApiProperty({
        description: 'Street name',
        type: 'string',
        example: '9 de Julio',
        maxLength: 200,
        nullable: false,
    })
    streetName: string

    @IsNumber()
    @ApiProperty({
        description: 'Street number',
        type: 'integer',
        example: 3850,
        nullable: false,
    })
    streetNumber: number

    @IsString()
    @ApiProperty({
        description: 'Zip code',
        type: 'string',
        example: 'X2400AIQ',
        nullable: false,
    })
    zipCode: string

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: 'Floor number',
        type: 'small-integer',
        example: 8,
        default: null,
    })
    floor?: number

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

    @IsNumber()
    @ApiProperty({
        description: 'Id of the entity this address belongs',
        example: 4,
        type: 'big-integer',
        nullable: false,
    })
    subjectId: number

    @IsString()
    @Length(1, 100)
    @ApiProperty({
        description: 'Entity type this address belongs',
        example: 'User',
        type: 'string',
        maxLength: 100,
        nullable: false,
    })
    subjectType: string
}