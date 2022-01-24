import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @ApiProperty({
    example: 1,
    description: 'Cart Item ID',
    readOnly: true,
    type: Number,
  })
  id: number;

  @Column({
    name: 'quantity',
    type: 'int',
    nullable: false,
  })
  @ApiProperty({
    type: Number,
    example: 10,
    description: 'Cart Item quantity in Cart',
    nullable: false,
    minimum: 1,
  })
  quantity: number;

  @Column({
    name: 'subtotal',
    type: 'bigint',
    nullable: false,
  })
  @ApiProperty({
    example: 1000,
    description: 'Cart Item subtotal',
    nullable: false,
    type: Number,
  })
  subtotal: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  @ApiProperty({
    example: '2016-03-26 10:10:10-05:00',
    description: "Cart Item's creation date",
    format: 'date-time',
    type: Date,
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
  })
  @ApiProperty({
    example: '2016-03-26 10:10:10-05:00',
    description: "Cart Item's last update date",
    format: 'date-time',
    type: Date,
    nullable: false,
  })
  updatedAt: Date;

  @ManyToOne(() => Item, (item) => item.cartItems)
  @JoinColumn({
    name: 'item_id',
  })
  @ApiProperty({
    example: 10,
    description: 'Id of the Item that the Cart Item represents',
  })
  itemId: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn({
    name: 'cart_id',
  })
  @ApiProperty({
    example: 999,
    description: 'Id of the Cart which Cart Item belongs',
  })
  cartId: number;
}
