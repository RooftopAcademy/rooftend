import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/items.entity';
import { Not, Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { User } from '../../users/entities/user.entity';

interface ItemSearchOptions {
  sellerId? : Number,
  userId? : Number,
  categoryId? : Number,
  exclude? : boolean,
  orderBy? : string,
  dir? : "ASC" | "DESC"
}

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly ItemsRepo: Repository<Item>,
  ) { }

  /**
   * @param user User who performs this query
   * @param options
   */
  findAll(options : ItemSearchOptions, user? : User): Promise<Pagination<Item>> {
    let q = this.ItemsRepo.createQueryBuilder();

    /**
     * Exclude current user from search
     */
    if (options.exclude && user) {
      q.andWhere({ 'user_id' : Not(user.id) })
    }

    /**
     * Get only items published by given user id (as seller profile)
     */
    if (options.sellerId) {
      q.andWhere({ 'user_id' : options.sellerId })
    }

    /**
     * Get only items from selected category
     */
    if (options.categoryId) {
      q.andWhere({ 'category_id' : options.categoryId })
    }

    /**
     * Ordering by field and direction
     */
    if (options.orderBy) {
      q.orderBy(options.orderBy, options.dir)
    }

    return paginate(q, { limit : 1, page : 1 });
  }

  findOne(id: number): Promise<Item> {
    return this.ItemsRepo.findOne(id);
  }

  create(body: any): Promise<Item> {
    return this.ItemsRepo.save(body);
  }

  async update(id: number, body: any): Promise<Item> {
    const item = await this.findOne(id);
    this.ItemsRepo.merge(item, body);
    return this.ItemsRepo.save(item);
  }

  async delete(id: number): Promise<boolean> {
    await this.ItemsRepo.delete(id);
    return true;
  }
}
