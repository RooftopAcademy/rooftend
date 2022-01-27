import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class UpdateNotificationDto {
    @IsOptional()
    @IsString()
    @Length(1,100)
    @ApiProperty({
        description: 'Link to where it redirects when the user clicks.',
        type: String
    })
    action_url: string;

    @IsOptional()
    @IsString()
    @Length(1,20)
    @ApiProperty({
        description: 'The main title.',
        type: String
    })
    title: string;

    @IsOptional()
    @IsString()
    @Length(1,120)
    @ApiProperty({
        description: 'The description of notification.',
        type: String
    })
    description: string;

    @IsOptional()
    @IsString()
    @Length(1,100)
    @ApiProperty({
        description:'Url where the image is hosted',
        type: String
    })
    image_url: string;
}