import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/items.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly ItemsRepo: Repository<Item>,
  ) { }

  findAll(): Promise<Item[]> {
    return this.ItemsRepo.find();
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
