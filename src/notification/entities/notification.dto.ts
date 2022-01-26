import { ApiProperty } from "@nestjs/swagger";

export class NotificationDto {
    
    @ApiProperty({
        description: 'Link to where it redirects when the user clicks.',
        type: String
    })
    action_url: string;

    @ApiProperty({
        description: 'The main title.',
        type: String
    })
    title: string;

    @ApiProperty({
        description: 'The description of notification.',
        type: String
    })
    description: string;

    @ApiProperty({
        description:'Url where the image is hosted',
        type: String
    })
    image_url: string;
}