import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/items.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { User } from '../../users/entities/user.entity';
import { CreateItemDto } from '../entities/create.item.dto';
import { ItemSearchOptions } from '../interfaces/item-search-options.interface';
import { UpdateItemDto } from '../entities/update.item.dto';
import { Category } from '../../categories/entities/categories.entity';
import { Brand } from '../../brands/entities/brands.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepo: Repository<Item>,
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
    @InjectRepository(Brand)
    private readonly brandsRepo: Repository<Brand>,
  ) {}

  /**
   * Returns paginated list of items
   * @param user User who performs this query
   * @param searchOptions
   * @param paginationOptions
   */
  findAll(
    searchOptions: ItemSearchOptions,
    paginationOptions: IPaginationOptions,
    user?: User,
  ): Promise<Pagination<Item>> {
    const q = this.itemsRepo.createQueryBuilder('items');

    q.leftJoinAndSelect('items.user', 'user');
    q.leftJoinAndSelect('items.category', 'category');
    q.leftJoinAndSelect('items.brand', 'brand');

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
    const item = await this.itemsRepo.findOne(id);

    if (!item) throw new NotFoundException('Item Not Found');

    return item;
  }

  async create(user: User, body: CreateItemDto): Promise<Item> {
    const item = this.itemsRepo.create(body);
    item.user = user;

    if (body.brandId) {
      const brand: Brand = await this.brandsRepo.findOne(body.brandId);

      if (!brand) {
        throw new UnprocessableEntityException('Brand does not exist');
      }

      item.brand = brand;
    }

    const category: Category = await this.categoriesRepo.findOne(
      body.categoryId,
    );

    if (!category) {
      throw new UnprocessableEntityException('Category does not exist');
    }

    item.category = category;

    return this.itemsRepo.save(item);
  }

  async update(item: Item, body: UpdateItemDto): Promise<UpdateResult> {
    return this.itemsRepo.update(item, body);
  }

  async delete(item: Item): Promise<DeleteResult> {
    return this.itemsRepo.delete(item);
  }
}
