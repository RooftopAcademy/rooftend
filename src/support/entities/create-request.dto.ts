import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({
    type: String,
    description: 'The question itself',
    example: "The system doesn't let me post an item, what's wrong?",
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    type: Number,
    description: 'The user who makes the request',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  user: number;
}
