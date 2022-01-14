import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/items.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { User } from '../../users/entities/user.entity';
import { CreateItemDTO } from '../entities/create.item.dto';
import { UpdateItemDTO } from '../entities/update.item.dto';

interface ItemSearchOptions {
  sellerId?: number;
  userId?: number;
  categoryId?: number;
  exclude?: boolean;
  orderBy?: string;
  dir?: 'ASC' | 'DESC';
}

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly ItemsRepo: Repository<Item>,
  ) {}

  /**
   * @param user User who performs this query
   * @param searchOptions
   */
  findAll(
    searchOptions: ItemSearchOptions,
    paginationOptions: IPaginationOptions,
    user?: User,
  ): Promise<Pagination<Item>> {
    const q = this.ItemsRepo.createQueryBuilder('item');

    q.leftJoinAndSelect('item.user', 'user');
    q.leftJoinAndSelect('item.category', 'categories');

    /**
     * Exclude current user from search
     */
    if (searchOptions.exclude && user) {
      q.andWhere('user.id != :userId', { userId: user.id });
    }

    /**
     * Get only items published by given user id (as seller profile)
     */
    if (searchOptions.sellerId) {
      q.andWhere('user.id = :sellerId', { sellerId: searchOptions.sellerId });
    }

    /**
     * Get only items from selected category
     */
    if (searchOptions.categoryId) {
      q.andWhere('category.id = :categoryId', {
        categoryId: searchOptions.categoryId,
      });
    }

    /**
     * Ordering by field and direction
     */
    if (searchOptions.orderBy) {
      q.orderBy(searchOptions.orderBy, searchOptions.dir);
    }

    return paginate(q, paginationOptions);
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.ItemsRepo.findOne(id);

    if (!item) throw new NotFoundException('Item Not Found');

    return item;
  }

  create(user: User, body: CreateItemDTO): Promise<Item> {
    const item = this.ItemsRepo.create(<Item>(body as any));
    item.user = user;

    return this.ItemsRepo.save(item);
  }

  async update(item: Item, body: UpdateItemDTO): Promise<Item> {
    this.ItemsRepo.merge(item, <Item>(body as any));
    return this.ItemsRepo.save(item);
  }

  async delete(id: number): Promise<boolean> {
    await this.ItemsRepo.delete(id);
    return true;
  }
}
