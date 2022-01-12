import { PromotionType } from "../entities/promotion-type.enum";

export class OfferDTO {
  itemTitle?: string;
  regularPrice?: number;
  discountRate?: number;
  finalPrice?: number;
  offerStartTime?: Date;
  offerEndTime?: Date;
  promotionType?: PromotionType;
  soldPercentage?: number;
  offerTimeLeft?: {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number,
  }
}