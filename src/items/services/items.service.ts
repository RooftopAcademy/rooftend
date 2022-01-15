import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/items.entity';
import { Not, Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { User } from '../../users/entities/user.entity';
import { CreateItemDTO } from '../entities/create.item.dto';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';

interface ItemSearchOptions {
  sellerId?: Number;
  userId?: Number;
  categoryId?: Number;
  exclude?: boolean;
  orderBy?: string;
  dir?: 'ASC' | 'DESC';
}

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly ItemsRepo: Repository<Item>,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  /**
   * @param user User who performs this query
   * @param options
   */
  findAll(options: ItemSearchOptions, user?: User): Promise<Pagination<Item>> {
    let q = this.ItemsRepo.createQueryBuilder();

    /**
     * Exclude current user from search
     */
    if (options.exclude && user) {
      q.andWhere({ user_id: Not(user.id) });
    }

    /**
     * Get only items published by given user id (as seller profile)
     */
    if (options.sellerId) {
      q.andWhere({ user_id: options.sellerId });
    }

    /**
     * Get only items from selected category
     */
    if (options.categoryId) {
      q.andWhere({ category_id: options.categoryId });
    }

    /**
     * Ordering by field and direction
     */
    if (options.orderBy) {
      q.orderBy(options.orderBy, options.dir);
    }

    return paginate(q, { limit: 1, page: 1 });
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.ItemsRepo.findOne(id);

    if (!item) throw new NotFoundException('Item Not Found');

    return item;
  }

  create(user: User, body: CreateItemDTO): Promise<Item> {
    const item = this.ItemsRepo.create(body);
    item.user = user;

    return this.ItemsRepo.save(item);
  }

  async update(item: Item, body: any): Promise<Item> {
    this.ItemsRepo.merge(item, body);
    return this.ItemsRepo.save(item);
  }

  async delete(user: User, id: number): Promise<boolean> {
    const item = await this.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user);
    item.user.id = Number(item.user.id);

    if (ability.cannot(Permission.Delete, subject('Item', item))) {
      throw new ForbiddenException();
    }

    await this.ItemsRepo.delete(id);
    return true;
  }
}
