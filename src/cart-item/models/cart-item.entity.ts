import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { Item } from "../src/items/entities/item.entity";
import { Cart } from "../src/cart/entities/cart.entity";

@Entity('cart_item')
export class cartItem {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint'
  })
  id: number;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'int',
  })
  subtotal: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Item)
  @Column({
    name: 'item_id'
  })
  itemId: number;

  @ManyToOne(() => Cart)
  @Column({
    name: 'cart_id',
  })
  cartId: number;
}
