import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from '../entities/items.entity';
import { User } from '../../users/entities/user.entity';

import { CreateItemDTO } from '../entities/create.item.dto';

import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/permission.enum';
import { ForbiddenError } from '@casl/ability';


@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly ItemsRepo: Repository<Item>,
    private readonly caslAbilityFactory: CaslAbilityFactory
  ) { }

  findAll(): Promise<Item[]> {
    return this.ItemsRepo.find();
  }

  findOne(id: number): Promise<Item> {
    const item = this.ItemsRepo.findOne(id);

    if (!item) throw new NotFoundException('Item Not Found');

    return item;
  }

  create(user: User, body: CreateItemDTO): Promise<Item> {
    const item = this.ItemsRepo.create(body);
    item.userId = user.id;

    return this.ItemsRepo.save(item);
  }

  async update(user: User, id: number, body: any): Promise<Item> {
    const item = await this.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user);

    ForbiddenError.from(ability).throwUnlessCan(Permission.Update, Object.assign(new Item(), item));

    this.ItemsRepo.merge(item, body);
    return this.ItemsRepo.save(item);
  }

  async delete(user: User, id: number): Promise<boolean> {
    const item = await this.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user);

    ForbiddenError.from(ability).throwUnlessCan(Permission.Delete, Object.assign(new Item(), item));

    await this.ItemsRepo.delete(id);
    return true;
  }
}
