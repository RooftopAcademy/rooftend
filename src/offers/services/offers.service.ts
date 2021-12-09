import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { PromotionTypeDto } from '../dto/promotion-type.dto';
import { Offer } from '../entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
  ) {}

  async paginate(options: IPaginationOptions, promotionType?: PromotionTypeDto) {
    return paginate<Offer>(this.offersRepository.createQueryBuilder('offer')
      .leftJoinAndSelect('offer.item_id', 'item')
      .select([
        'item.title AS "itemTitle"',
        'item.price AS "regularPrice"',
        'offer.discount AS "discountRate"',
        'offer.final_price AS "finalPrice"',
      ])
      .where('now() BETWEEN offer.start_at AND offer.end_at')
      .andWhere('offer.promotion_type = ":promotionType"', { promotionType }),
      options,
    );
  }
}
