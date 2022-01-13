import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class ReceivedMessageDTO {
    @ApiProperty({
        type: Date,
        description: 'Message date created',
        example: '2021-12-10 12:32:19.537+00',
    })
    @IsDateString()
    receivedAt: Date;
}