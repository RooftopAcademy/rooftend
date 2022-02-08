import { IsEnum, IsNumber, IsString, MaxLength } from "class-validator";
import { opinionsEnum } from "../enum/opinions.enum";

class userReviewDTO {
    @IsEnum(opinionsEnum)
    opinion: opinionsEnum

    @IsString()
    @MaxLength(500)
    comment: string

    @IsNumber()
    itemId: number

}

export default userReviewDTO;