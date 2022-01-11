import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Cart } from '../../cart/entities/cart.entity';
import { Item } from '../../items/entities/items.entity';

@Entity('cart_item')
export class CartItem {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  @ApiProperty({ example: 1, description: 'Cart Item ID' })
  id: number;

  @Column({
    type: 'int',
  })
  @ApiProperty({ example: 10, description: 'Cart Item quantity in Cart' })
  quantity: number;

  @Column({
    type: 'int',
  })
  @ApiProperty({ example: 1000, description: 'Cart Item subtotal' })
  subtotal: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2016-03-26 10:10:10-05:00',
    description: "Cart Item's creation date",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2016-03-26 10:10:10-05:00',
    description: "Cart Item's last update date",
  })
  updatedAt: Date;

  @ManyToOne(() => Item, (item) => item.cartItemsId)
  @JoinColumn({
    name: 'item_id',
  })
  @ApiProperty({
    example: 10,
    description: 'Id of the Item that the Cart Item represents',
  })
  itemId: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({
    name: 'cart_id',
  })
  @ApiProperty({
    example: 999,
    description: 'Id of the Cart which Cart Item belongs',
  })
  cartId: number;
}
