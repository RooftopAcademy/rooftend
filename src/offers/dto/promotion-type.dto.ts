import { IsEnum } from "class-validator";
import { PromotionType } from "../entities/offer.entity";

export class PromotionTypeDto {
    @IsEnum(PromotionType)
    promotionType: PromotionType
}