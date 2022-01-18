import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateStoreDto {

    @IsInt()
    @ApiProperty({
        type: Number,
    })
    userId?: number;

    @IsInt()
    @ApiProperty({
        type: Number,
    })
    brandId?: number;
}