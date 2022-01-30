import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, IsNull, Not, Repository } from 'typeorm';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { User } from '../../users/entities/user.entity';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>) {}

  findAll(): Promise<Cart[]> {
    return this.cartRepo.find();
  }

  findOne(id: number): Promise<Cart> {
    return this.cartRepo.findOne(id);
  }

  /**
   * Find cart owned by user
   * @param id
   * @param userId
   * @param purchased
   */
  findOneFromUser(id: number, user: User, purchased = true): Promise<Cart> {
    const q = this.cartRepo.createQueryBuilder();

    q.where({ userId: user.id, id });

    if (purchased) {
      q.where({ purchasedAt: Not(IsNull()) });
    }

    return q.getOneOrFail();
  }

  create(user: User): Promise<Cart> {
    const newCart = this.cartRepo.create({
      user,
    });

    return this.cartRepo.save(newCart);
  }

  async update(id: number, body: any): Promise<Cart> {
    const cart = await this.cartRepo.findOne(id);
    this.cartRepo.merge(cart, body);
    return this.cartRepo.save(cart);
  }

  async delete(id: number): Promise<void> {
    await this.cartRepo.delete(id);
  }

  async getCartItems(id: number) {
    const cartItemsRepo = await getRepository(CartItem);
    return cartItemsRepo.find({
      cartId: id,
    });
  }

  @OnEvent('user.confirmed')
  handleUserCreatedEvent(user: User) {
    this.create(user);
  }
}
