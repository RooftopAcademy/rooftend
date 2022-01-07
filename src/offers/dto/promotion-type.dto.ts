import {
  IsEnum,
  IsOptional,
} from "class-validator";

import { PromotionType } from "../entities/promotion-type.enum";

export class PromotionTypeDTO {
  @IsEnum(PromotionType)
  @IsOptional()
  promotionType: PromotionType;
}