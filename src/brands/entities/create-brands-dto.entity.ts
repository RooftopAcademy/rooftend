import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class createBrandDTO{
    @IsString()
    @ApiProperty({example: '', description: 'The name of the brand', type: String})
    name: string;

    @IsString()
    @ApiProperty({example: '', description: 'The logo of the brand', type: String})
    photoId: string;
}