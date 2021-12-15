import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Delivery } from '../../deliveries/entities/delivery.entity';
import { Item } from '../../items/entities/items.entity';
import { PhotosEntity } from '../../photos/models/photos.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async findAll(userId: number): Promise<Cart[]> {
    return await this.cartRepository.find({
      where: {
        userId,
        purchasedAt: Not(IsNull()),
      },
    });
  }

  async findOneById(id: number | string, userId: number) {
    const purchase = await this.cartRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!purchase) {
      throw new NotFoundException('Purchase not found');
    }

    if (purchase.purchasedAt === null) {
      throw new ForbiddenException('This cart has not been purchased');
    }

    // const newQuery = this.cartRepository.query(`
    //   SELECT Ca.purchased_at, Ph.url, I.title, I.price, CI.quantity, De.status
    //   FROM carts AS Ca
    //   INNER JOIN cart_item AS CI ON Ca.id = CI.cart_id
    //   INNER JOIN items AS I ON CI.item_id = I.id
    //   LEFT JOIN photos AS Ph ON Ph.subject_id = CI.item_id
    //   LEFT JOIN deliveries AS De ON De.cart_id = Ca.id
    //   WHERE Ca.id = ${id}`);

    const newQuery = await this.cartRepository
      .createQueryBuilder('carts')
      .where('carts.id = :id')
      .setParameter('id', id)
      .andWhere('carts.user_id =:userId')
      .setParameter('userId', userId)
      .innerJoin(CartItem, 'cart_item', 'carts.id = cart_item.cart_id')
      .innerJoin(Item, 'items', 'cart_item.item_id = items.id')
      .leftJoin(PhotosEntity, 'photos', 'cart_item.item_id = photos.subject_id')
      .leftJoin(Delivery, 'deliveries', 'carts.id = deliveries.cart_id')
      .select('carts.purchased_at')
      .addSelect([
        'items.title',
        'items.price',
        'cart_item.quantity',
        'photos.url',
        'deliveries.status',
      ])
      .getRawMany();

    // .innerJoin('carts.cartItemsId', 'cart_items')

    // .innerJoinAndMapOne(
    //   'cart_item.item_id',
    //   Item,
    //   'items',
    //   'cart_item.item_id = items.id',
    // )

    return newQuery;
  }
}
