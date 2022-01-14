import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Item } from '../../items/entities/items.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
    @InjectRepository(Item)
    private readonly items: Repository<Item>,
  ) {}

  /**
   * Find all items attached to one cart
   * @param cartId
   */
  findAllFromCart(cartId: number): Promise<CartItem[]> {
    return this.cartItemRepo.find({
      cartId: cartId,
    });
  }

  /**
   * Find any item by the id
   * @param itemId
   */
  findById(itemId: number): Promise<CartItem> {
    return this.cartItemRepo.findOne({ itemId });
  }

  /**
   * Find items
   * @param itemId
   * @param cartId
   */
  async findOneFromCart(itemId: number, cartId: number): Promise<CartItem> {
    return await this.cartItemRepo
      .findOne({
        cartId,
        itemId,
      })
      .then((data) => {
        if (data) return data;
        throw new NotFoundException();
      });
  }

  /**
   * @param {number} cartId
   * @param {number} itemId
   * @param body
   */
  async create(cartId: number, itemId: number, body: any): Promise<CartItem> {
    /**
     * @var Item
     */
    const item = await this.items.findOne(itemId);

    if (!item.isActive()) {
      throw new ForbiddenException('This item has been paused');
    }

    if (!item.isAvailable(body.quantity)) {
      throw new ForbiddenException('Required quantity not available');
    }

    const price = item.getFinalPrice();

    this.cartItemRepo.merge({ ...body, price }, { cartId, itemId });

    return this.cartItemRepo.save(body);
  }

  /**
   * @param cartId
   * @param itemId
   */
  delete(cartId: number, itemId: number): Promise<DeleteResult> {
    return this.cartItemRepo.delete({
      itemId,
      cartId,
    });
  }
}
