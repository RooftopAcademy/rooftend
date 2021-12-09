import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
  IPaginationOptions,
  paginateRaw,
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
    const selection: string[] = [
        'item.title AS "itemTitle"',
        'item.price AS "regularPrice"',
        'offer.discount AS "discountRate"',
        'offer.final_price AS "finalPrice"',
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
}
