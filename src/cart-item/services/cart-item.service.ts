import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { Repository } from 'typeorm';
import { Item } from '../../items/entities/items.entity';
import { CreateCartItemDTO } from '../entities/create-cart-item.dto';
import { UpdateCartItemDTO } from '../entities/update-cart-item.dto';
import { ItemsService } from '../../items/services/items.service';
import Status from '../../statusCodes/status.interface';
import STATUS from '../../statusCodes/statusCodes';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
    private readonly itemsService: ItemsService,
  ) {}

  /**
   * Find all items attached to one cart
   * @param cartId
   */
  findAllFromCart(cartId: number): Promise<CartItem[]> {
    return this.cartItemRepo.find({
      where: { cart: { id: cartId } },
      relations: ['item'],
    });
  }

  /**
   * Find items
   * @param itemId
   * @param cartId
   */
  async findOne(cartId: number, itemId: number): Promise<CartItem> {
    const cartItem = this.cartItemRepo.findOne({
      where: { cartId, itemId },
      relations: ['item'],
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
  async create(cartId: number, body: CreateCartItemDTO): Promise<CartItem> {
    /**
     * @var Item
     */
    const item: Item = await this.itemsService.findOne(body.itemId);

    if (!item.isActive()) {
      throw new ForbiddenException('This item has been paused');
    }

    if (!item.isAvailable(body.quantity)) {
      throw new ForbiddenException('Required quantity not available');
    }

    const subtotal = item.getFinalPrice(body.quantity);

    const cartItem = this.cartItemRepo.create({ ...body, subtotal, cartId });

    return this.cartItemRepo.save(cartItem);
  }

  async update(
    cartId: number,
    itemId: number,
    body: UpdateCartItemDTO,
  ): Promise<CartItem> {
    const cartItem = await this.findOne(cartId, itemId);
    this.cartItemRepo.merge(cartItem, body);
    cartItem.subtotal = cartItem.item.getFinalPrice(cartItem.quantity);

    return this.cartItemRepo.save(cartItem);
  }

  /**
   * @param cartId
   * @param itemId
   */
  async delete(cartId: number, itemId: number): Promise<Status> {
    const cartItem: CartItem = await this.findOne(cartId, itemId);

    await this.cartItemRepo.delete(cartItem);

    return STATUS.DELETED;
  }
}
