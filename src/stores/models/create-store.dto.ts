import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreDto {
    @ApiProperty({
        type: Number,
    })
    userId?: number;

    @ApiProperty({
        type: Number,
    })
    brandId?: number;
}