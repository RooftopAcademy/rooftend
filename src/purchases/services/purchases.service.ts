import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { Delivery } from '../../deliveries/entities/delivery.entity';
import { PhotosEntity } from '../../photos/models/photos.entity';
import { ItemDetails } from '../entities/item-details.entity';
import { PurchaseDetails } from '../entities/purchase-details.entity';

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

  async findOneById(
    id: number | string,
    userId: number,
  ): Promise<PurchaseDetails> {
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

    const newQuery = await this.cartRepository
      .createQueryBuilder('carts')
      .where('carts.id = :id')
      .setParameter('id', id)
      .andWhere('carts.user_id =:userId')
      .setParameter('userId', userId)
      .leftJoin('carts.cartItemsId', 'cart_item')
      .leftJoin('cart_item.itemId', 'items')
      .leftJoin(PhotosEntity, 'photos', 'cart_item.item_id = photos.subject_id')
      .leftJoin(Delivery, 'deliveries', 'carts.id = deliveries.cart_id')
      .select('carts.purchased_at AS "purchasedAt"')
      .addSelect([
        'items.title AS title',
        'items.price AS price',
        'cart_item.quantity AS quantity',
        'photos.url AS photo',
        'deliveries.status AS "deliveryStatus"',
      ])
      .getRawMany();

    const purchaseDetails: PurchaseDetails = new PurchaseDetails();

    if (newQuery.length != 0) {
      purchaseDetails.purchasedAt = newQuery[0].purchasedAt;
      purchaseDetails.deliveryStatus = newQuery[0].deliveryStatus;
      purchaseDetails.itemDetails = [];

      for (let index = 0; index < newQuery.length; index++) {
        const itemDetails = new ItemDetails();
        itemDetails.title = newQuery[index].title;
        itemDetails.quantity = newQuery[index].quantity;
        itemDetails.price = newQuery[index].price;
        itemDetails.photo = newQuery[index].photo;

        purchaseDetails.itemDetails.push(itemDetails);
      }
    }

    return purchaseDetails;
  }
}
