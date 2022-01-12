import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from '../entities/items.entity';
import { User } from '../../users/entities/user.entity';

import { CreateItemDTO } from '../entities/create.item.dto';

import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/permission.enum';
import { subject } from '@casl/ability';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly ItemsRepo: Repository<Item>,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  findAll(): Promise<Item[]> {
    return this.ItemsRepo.find();
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

  async update(user: User, id: number, body: any): Promise<Item> {
    const item = await this.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user);
    item.user.id = +item.user.id

    if (ability.cannot(Permission.Update, subject("Item", item)))
      throw new ForbiddenException();

    this.ItemsRepo.merge(item, body);
    return this.ItemsRepo.save(item);
  }

  async delete(user: User, id: number): Promise<boolean> {
    const item = await this.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user);
    item.user.id = +item.user.id

    if (ability.cannot(Permission.Delete, subject("Item", item)))
      throw new ForbiddenException();

    await this.ItemsRepo.delete(id);
    return true;
  }
}
