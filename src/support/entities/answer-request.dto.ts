import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AnswerRequestDto {
  @ApiProperty({
    type: String,
    description: 'The answer to a question referred in the reply_to field',
    example: 'There are many ways to address this issue...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    type: Number,
    description: 'The user who provides the support',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  user: number;

  @ApiProperty({
    type: Number,
    description:
      'The id of the initial question to which this supportRequest is offering an answer',
    example: 1,
    default: null,
    nullable: true,
  })
  @IsInt()
  @IsNotEmpty()
  replyTo: number;
}
