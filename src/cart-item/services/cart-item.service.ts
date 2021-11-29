import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
  ) { }

  findAll(): Promise<CartItem[]> {
    return this.cartItemRepo.find();
  }

  findOne(id: number): Promise<CartItem> {
    return this.cartItemRepo.findOne(id);
  }

  create(body: any): Promise<CartItem> {
    return this.cartItemRepo.save(body);
  }

  async update(id: number, body: any): Promise<CartItem> {
    const cartItem = await this.findOne(id);
    this.cartItemRepo.merge(cartItem, body);
    return this.cartItemRepo.save(cartItem);
  }

  async delete(id: number): Promise<boolean> {
    await this.cartItemRepo.delete(id);
    return true;
  }
}