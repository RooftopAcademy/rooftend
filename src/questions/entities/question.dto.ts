import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class QuestionDTO {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '¿Me podes dar fiado?',
        description: 'Question content',
        type: String,
    })
    content: string;
}