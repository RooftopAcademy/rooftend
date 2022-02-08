import { IsBoolean } from "class-validator";


export default class LKikeDTO {
    @IsBoolean()
    liked: boolean;
}