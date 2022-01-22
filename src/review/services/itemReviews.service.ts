import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { UserReviews } from '../entities/userReviews.entity';
import { User } from '../../users/entities/user.entity';
import Status from '../../statusCodes/status.interface';
import STATUS from '../../statusCodes/statusCodes';
import CreateReviewDTO from '../entities/review.create.dto';

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

  async paginate(options: IPaginationOptions): Promise<Pagination<ItemReviews>> {
    return paginate<ItemReviews>(this.itemReviewsRepository, options);
  }

  async findAll(): Promise<ItemReviews[]> {
    return this.itemReviewsRepository.find();
  }

  async findOne(id: string | number): Promise<ItemReviews> {
    const review: ItemReviews | undefined = await this.itemReviewsRepository.findOne(id);

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found.`);
    }
    return review;
  }


  // it would return the created entity
  async create(review: CreateReviewDTO, user: User, itemId: number): Promise<Status> {
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
   * @param itemId
   */
  findUnreviewedItem(itemId: number) {
    let q = this.itemReviewsRepository.createQueryBuilder()

    q.where({ entityType: "item", entityId: itemId }).getOne()

    return q
  }
}
