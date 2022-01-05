import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
  IPaginationOptions,
  paginateRaw,
} from 'nestjs-typeorm-paginate';
import {
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { Offer } from '../entities/offer.entity';
import { PromotionType } from '../entities/promotion-type.enum';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
  ) {}

  async paginate(options: IPaginationOptions, promotionType?: PromotionType, order?: "ASC" | "DESC") {

    const selection: string[] = [
      'item.title AS "itemTitle"',
      'item.price AS "regularPrice"',
      'offer.discount AS "discountRate"',
      'offer.final_price AS "finalPrice"',
      'offer.start_at AS "offerStartTime"',
      'offer.end_at AS "offerEndTime"',
      '((offer.initial_stock - offer.sold_stock) * 100 / offer.initial_stock)::INTEGER AS "soldPercentage"',
      '(offer.end_at - NOW()) AS "offerTimeLeft"',
      'offer.promotion_type AS promotionType',
    ];

    const dateCondition: string = 'now() BETWEEN offer.start_at AND offer.end_at';
    const promotionTypeCondition: string = `offer.promotion_type = '${ promotionType }'`;

    const queryWithoutTypeCondition: SelectQueryBuilder<Offer> = this.offersRepository.createQueryBuilder('offer')
      .leftJoinAndSelect('offer.item', 'item')
      .select(selection)
      .where(dateCondition);
    
    const queryWithoutOrder: SelectQueryBuilder<Offer> = (promotionType)
      ? queryWithoutTypeCondition.andWhere(promotionTypeCondition)
      : queryWithoutTypeCondition;
    
    return paginateRaw<Offer>(
      (order) ? queryWithoutOrder.orderBy('offer.final_price') : queryWithoutOrder,
      options,
    );
  }
}