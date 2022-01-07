import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({
    type: String,
    description: 'The question itself',
    example: "The system doesn't let me post an item, what's wrong?",
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
