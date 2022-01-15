import {
  ForbiddenException,
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
import { CreateItemDto } from '../entities/create.item.dto';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';
import { ItemSearchOptions } from '../interfaces/item-search-options.interface';
import { UpdateItemDto } from '../entities/update.item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepo: Repository<Item>,
    private readonly caslAbilityFactory: CaslAbilityFactory,
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

  create(user: User, body: CreateItemDto): Promise<Item> {
    const item = this.itemsRepo.create(body);
    item.user = user;

    return this.itemsRepo.save(item);
  }

  async update(item: Item, body: UpdateItemDto): Promise<Item> {
    this.itemsRepo.merge(item, body);
    return this.itemsRepo.save(item);
  }

  async delete(user: User, id: number): Promise<boolean> {
    const item = await this.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user);
    item.user.id = Number(item.user.id);

    if (ability.cannot(Permission.Delete, subject('Item', item))) {
      throw new ForbiddenException();
    }

    await this.itemsRepo.delete(id);
    return true;
  }
}
