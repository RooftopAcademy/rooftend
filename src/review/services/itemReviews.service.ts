import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { User } from '../../users/entities/user.entity';
import Status from '../../statusCodes/status.interface';
import STATUS from '../../statusCodes/statusCodes';
import ItemReviewDTO from '../entities/itemReview.create.dto';

import { Item } from '../../items/entities/items.entity';
import { Repository } from 'typeorm';
import { ItemReviews } from '../entities/itemReviews.entity';
import { ItemsService } from '../../items/services/items.service';

@Injectable()
export class ItemReviewsService {
  constructor(
    @InjectRepository(ItemReviews)
    private readonly itemReviewsRepository: Repository<ItemReviews>,
    private readonly itemsService: ItemsService,
  ) { }

  async paginate(options: IPaginationOptions, itemId: number, filter?: 'POS' | 'NEG'): Promise<Pagination<ItemReviews>> {
    let reviews = this.itemReviewsRepository.createQueryBuilder('reviews')
      .leftJoin('reviews.item', 'items')
      .where('items.id = :itemId', { itemId })

    if (filter == 'POS') {
      reviews.andWhere('reviews.score > 3')
    }

    if (filter == 'NEG') {
      reviews.andWhere('reviews.score < 3')
    }
    return paginate<ItemReviews>(reviews, options)
  }



  // it would return the created entity
  async create(review: ItemReviewDTO, user: User, itemId: number): Promise<Status> {
    try {
      const item = await this.itemsService.findOne(itemId);
      const reviewEntity = this.itemReviewsRepository.create({
        ...review,
        'item': item,
        'user': user,
      });
      await this.itemReviewsRepository.save(reviewEntity);
      return STATUS.CREATED
    }
    catch (err) {
      throw new UnprocessableEntityException();
    }
  }


  /**
   * Find if some item has been reviewed
   * Returns "1" if true or "0" if false
//    * @param itemId
//    */
  //   findUnreviewedItem(itemId: number) {
  //     let q = this.itemReviewsRepository.createQueryBuilder('review')
  //     q.where('review.item_id == :itemId', { itemId: itemId }).getOne()
  //     console.log(q)
  //     return q
  //   }
  // }
}