import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
  IPaginationMeta,
  IPaginationOptions,
  paginateRaw,
  Pagination,
} from 'nestjs-typeorm-paginate';
import {
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { PriceOrder } from '../controllers/price-order.enum';
import { OfferDTO } from '../dto/offer.dto';
import { PriceRangeDTO } from '../dto/price-range.dto';
import { Offer } from '../entities/offer.entity';
import { PromotionType } from '../entities/promotion-type.enum';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
  ) {}

  async paginate(
    options: IPaginationOptions,
    promotionType?: PromotionType,
    order?: PriceOrder,
    priceRange?: PriceRangeDTO,
    ): Promise<Pagination<OfferDTO, IPaginationMeta>> {

    const query: SelectQueryBuilder<OfferDTO> = this.offersRepository.createQueryBuilder('offer')
      .leftJoinAndSelect('offer.item', 'item')
      .select([
        'item.title AS "itemTitle"',
        'item.price AS "regularPrice"',
        'offer.discount AS "discountRate"',
        'offer.final_price AS "finalPrice"',
        'offer.start_at AS "offerStartTime"',
        'offer.end_at AS "offerEndTime"',
        'offer.promotion_type AS "promotionType"',
      ])
      .where('now() BETWEEN offer.start_at AND offer.end_at')
      .addSelect(`
        CASE WHEN offer.promotion_type = 'LIGHTNING_DEAL'
        THEN ((offer.initial_stock - offer.sold_stock) * 100 / offer.initial_stock)::INTEGER END AS "soldPercentage"
      `)
      .addSelect(`
        CASE WHEN offer.promotion_type = 'LIGHTNING_DEAL'
        THEN (offer.end_at - NOW()) END AS "offerTimeLeft"
      `);
    
    if (priceRange) {
      query.andWhere('offer.final_price > :min AND offer.final_price < :max', priceRange);
    }
    
    if (promotionType) {
      query.andWhere('offer.promotion_type = :promotionType', { promotionType });
    }

    if (order) {
      query.orderBy('offer.final_price', order);
    }

    return paginateRaw(query, options);
  }
}