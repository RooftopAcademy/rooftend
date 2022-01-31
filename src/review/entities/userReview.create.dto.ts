import { IsEnum, IsNumber, MaxLength } from "class-validator";
import { opinionsEnum } from "./opinions.enum";

class userReviewDTO {
    @IsEnum(opinionsEnum)
    opinion: opinionsEnum

    @IsNumber()
    @MaxLength(500)
    comment: string

    @IsNumber()
    userId: number
}

export default userReviewDTO;