import { ApiProperty } from "@nestjs/swagger";

export class ReadStoreDto {
    @ApiProperty({
        type: String,
    })
    brand?: string;
}