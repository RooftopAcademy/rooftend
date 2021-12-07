import { isEnum } from "class-validator";
import { Offer, PromotionType } from "../entities/offer.entity";

export class PromotionTypeDto {
    // @isEnum({
        // LIGHTENING_DEAL: 'LIGHTENING_DEAL',
        // DEAL_OF_THE_DAY: 'DEAL_OF_THE_DAY',
    // })
    @isEnum(PromotionType)
    promotionType: PromotionType
}