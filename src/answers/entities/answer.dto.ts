import {
    IsInt,
    IsNotEmpty,
    IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AnswerDTO {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'No nos quedan en color rojo.',
        description: 'Answer content',
        type: String,
    })
    content: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty({
        example: 2,
        description: 'Question id',
        type: Number,
    })
    questionId: number;
}