import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from 'src/items/entities/item.entity';
import { ItemsInterface } from 'src/items/entities/item.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private readonly ItemsRepo: Repository<Items>,
  ) { }

  findAll(): Promise<ItemsInterface[]> {
    return this.ItemsRepo.find();
  }

  findOne(id: number): Promise<ItemsInterface> {
    return this.ItemsRepo.findOne(id);
  }

  create(body: any): Promise<ItemsInterface> {
    return this.ItemsRepo.save(body);
  }

  async update(id: number, body: any): Promise<ItemsInterface> {
    const item = await this.findOne(id);
    this.ItemsRepo.merge(item, body);
    return this.ItemsRepo.save(item);
  }

  async delete(id: number): Promise<boolean> {
    await this.ItemsRepo.delete(id);
    return true;
  }
}
