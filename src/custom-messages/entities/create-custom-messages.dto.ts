import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCustomMessageDTO {
  @IsString()
  @ApiProperty({
    description: 'The message subject',
    type: String,
    nullable: false
  })
  subject: string;

  @IsString()
  @ApiProperty({
    description: 'The message content',
    type: String,
    nullable: false
  })
  message: string;
}
