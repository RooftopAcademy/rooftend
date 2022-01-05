import {
  IsEnum,
  IsOptional,
} from "class-validator";

import { PromotionType } from "../entities/promotion-type.enum";

export class PromotionTypeDto {
  @IsEnum(PromotionType)
  @IsOptional()
  promotionType: PromotionType;
}