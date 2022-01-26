import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
  ) {}

  findAll(cartId: number): Promise<CartItem[]> {
    return this.cartItemRepo.find({
      cartId: cartId,
    });
  }

  async findOne(cartId: number, itemId: number): Promise<CartItem> {
    const cartItem = this.cartItemRepo.findOne({
      cartId,
      itemId,
    });

    if (!cartItem) throw new NotFoundException();

    return cartItem;
  }

  create(cartId: number, itemId: number, body: any): Promise<CartItem> {
    this.cartItemRepo.merge(body, { cartId, itemId });
    return this.cartItemRepo.save(body);
  }

  async update(cartId: number, itemId: number, body: any): Promise<CartItem> {
    const cartItem = await this.findOne(cartId, itemId);
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
