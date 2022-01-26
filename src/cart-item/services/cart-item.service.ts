import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { Repository } from 'typeorm';
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
   * Find items
   * @param itemId
   * @param cartId
   */
  async findOne(cartId: number, itemId: number): Promise<CartItem> {
    const cartItem = this.cartItemRepo.findOne({
      cartId,
      itemId,
    });

    if (!cartItem) throw new NotFoundException();

    return cartItem;
  }

  /**
   * Find any item by the id
   * @param itemId
   */
  findById(itemId: number): Promise<CartItem> {
    return this.cartItemRepo.findOne({ itemId });
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

  async update(cartId: number, itemId: number, body: any): Promise<CartItem> {
    const cartItem = await this.findOne(cartId, itemId);
    this.cartItemRepo.merge(cartItem, body);
    return this.cartItemRepo.save(cartItem);
  }

  /**
   * @param cartId
   * @param itemId
   */
  delete(cartId: number, itemId: number): void {
    this.cartItemRepo.delete({
      itemId,
      cartId,
    });
  }
}
