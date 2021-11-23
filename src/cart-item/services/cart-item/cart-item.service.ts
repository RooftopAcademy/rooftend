import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cartItem } from 'src/cart-item/models/cart-item.entity';
import { cartInterface } from 'src/cart-item/models/cart-item.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(cartItem)
    private readonly cartItemRepo: Repository<cartItem>,
  ) { }

  findAll(): Promise<cartInterface[]> {
    return this.cartItemRepo.find();
  }

  findOne(id: number): Promise<cartInterface> {
    return this.cartItemRepo.findOne(id);
  }

  create(body: any): Promise<cartInterface> {
    return this.cartItemRepo.save(body);
  }

  async update(id: number, body: any): Promise<cartInterface> {
    const cartItem = await this.findOne(id);
    this.cartItemRepo.merge(cartItem, body);
    return this.cartItemRepo.save(cartItem);
  }

  async delete(id: number): Promise<boolean> {
    await this.cartItemRepo.delete(id);
    return true;
  }
}