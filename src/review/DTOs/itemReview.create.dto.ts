import { IsInt, IsString, Max, MaxLength, Min } from "class-validator";

class ItemReviewDTO {
    @MaxLength(500)
    @IsString()
    comment: string;

    @Max(5)
    @Min(1)
    @IsInt()
    score: number;
}

export default ItemReviewDTO;