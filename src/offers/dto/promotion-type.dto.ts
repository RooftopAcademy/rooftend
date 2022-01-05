import {
  IsEnum,
  IsOptional,
} from "class-validator";

import { PromotionType } from "../entities/offer.entity";

export class PromotionTypeDto {
  @IsEnum(PromotionType)
  @IsOptional()
  promotionType: PromotionType;
}