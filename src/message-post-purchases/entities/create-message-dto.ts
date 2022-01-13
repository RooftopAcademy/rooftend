import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString } from 'class-validator';

export class CreateMessageDTO {
  @ApiProperty({
    description: 'The cart id',
    type: Number,
  })
  @IsInt()
  cart_id: number;

  @ApiProperty({
    description: 'The sender id',
    type: Number,
  })
  @IsInt()
  sender_id: number;

  @ApiProperty({
    description: 'The sender id',
    type: Number,
  })
  @IsInt()
  received_id: number;

  @ApiProperty({
    description: 'Message of purchase',
    type: String,
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Send date of message',
    type: Date,
    example: '2021-10-19 10:23:54+03'
  })
  @IsDateString()
  sent_at: Date;
}
