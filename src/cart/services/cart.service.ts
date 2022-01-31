import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>) {}

  async findCart(userId: number): Promise<Cart> {
    const cart = await this.cartRepo.findOne({
      select: ['id', 'amount', 'currencyCode'],
      where: { purchasedAt: null, user: { id: userId } },
      relations: ['user'],
      order: { id: 'DESC' },
    });
    return cart;
  }

  /**
   * Find cart owned by user
   * @param id
   * @param userId
   * @param purchased
   */
  async findOne(id: number): Promise<Cart> {
    const cart: Cart = await this.cartRepo.findOne(id, {
      relations: ['items', 'user'],
    });
    return cart;
  }

  /**
   * Find cart owned by user
   * @param id
   * @param userId
   * @param purchased
   */
  findOneFromUser(id: number, userId: User, purchased = true): Promise<Cart> {
    const q = this.cartRepo.createQueryBuilder();

    q.where({ userId: userId.id, id });

    if (purchased) {
      q.where({ purchasedAt: Not(IsNull()) });
    }

    return q.getOneOrFail();
  }

  create(user: User): Promise<Cart> {
    let cart = this.cartRepo.create({ user });
    return this.cartRepo.save(cart);
  }

  @OnEvent('user.created')
  handleUserCreatedEvent(user: User) {
    this.create(user);
  }
}
