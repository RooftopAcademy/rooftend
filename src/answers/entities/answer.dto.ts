import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AnswerDTO {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'No nos quedan en color rojo.',
        description: 'Answer content',
        type: String,
    })
    content: string;
}