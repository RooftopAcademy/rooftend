import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
  ) { }

  findAll(cartId: number): Promise<CartItem[]> {
    return this.cartItemRepo.find({
      cartId: cartId,
    });
  }

  findOne(cartId: number, itemId: number): Promise<CartItem> {
    return this.cartItemRepo.findOne({
      cartId,
      itemId,
    });
  }

  create(cartId: number, itemId: number, body: any): Promise<CartItem> {
    this.cartItemRepo.merge(body, { cartId, itemId });
    return this.cartItemRepo.save(body);
  }

  async update(cartId: number, itemId: number, body: any): Promise<CartItem> {
    const cartItem = await this.cartItemRepo.findOne({
      cartId,
      itemId,
    });
    this.cartItemRepo.merge(cartItem, body);
    return this.cartItemRepo.save(cartItem);
  }

  delete(cartId: number, itemId: number): void {
    this.cartItemRepo.delete({
      itemId,
      cartId,
    });
  }
}
