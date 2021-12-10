import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
  IPaginationOptions,
  paginateRaw,
} from 'nestjs-typeorm-paginate';
import { of } from 'rxjs';
import { Repository } from 'typeorm';

import {
  Offer,
  PromotionType,
} from '../entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
  ) {}

  async paginate(options: IPaginationOptions, promotionType?: PromotionType) {

    const selection: string[] = [
      'item.title AS "itemTitle"',
      'item.price AS "regularPrice"',
      'offer.discount AS "discountRate"',
      'offer.final_price AS "finalPrice"',
      '((offer.initial_stock - offer.sold_stock) * 100 / offer.initial_stock)::INTEGER AS "soldPercentage"',
      '(offer.end_at - NOW()) AS "offerTimeLeft" '
    ]
    const dateCondition: string = 'now() BETWEEN offer.start_at AND offer.end_at';
    const promotionTypeCondition: string = `now() BETWEEN offer.start_at AND offer.end_at AND offer.promotion_type = '${ promotionType }'`;

    return paginateRaw<Offer>(this.offersRepository.createQueryBuilder('offer')
      .leftJoinAndSelect('offer.item', 'item')
      .select(selection)
      .where((promotionType) ? promotionTypeCondition : dateCondition),
      options,
    )
  }

  getOffer(id:number): Promise<Offer>{
    const offer = this.offersRepository.findOne(id);
    return offer;
  } 

}