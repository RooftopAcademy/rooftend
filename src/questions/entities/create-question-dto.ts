import {
    IsInt,
    IsNotEmpty,
    IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionDTO {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '¿Me podes dar fiado?',
        description: 'Question content',
        type: String,
    })
    content: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty({
        example: 2,
        description: 'Item id',
        type: Number,
    })
    itemId: number;
}