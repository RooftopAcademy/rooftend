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
    description: 'Message of purchase',
    type: String,
  })
  @IsString()
  message: string;

  @ApiProperty({
    type: Date,
    description: 'Message date created',
    example: '2021-12-10 12:32:19.537+00',
  })
  @IsDateString()
  createdAt: Date;
}
