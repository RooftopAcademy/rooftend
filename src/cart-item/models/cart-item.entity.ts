import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

//import { Item } from "src/items/entities/item.entity";
//import { Cart } from "src/cart/entities/cart.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('cart_item')
export class cartItem {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint'
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
  @ApiProperty({ example: '2016-03-26 10:10:10-05:00', description: "Cart Item's creation date" })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({ example: '2016-03-26 10:10:10-05:00', description: "Cart Item's last update date" })
  updatedAt: Date;

  //  @ManyToOne(() => Item)
  @Column({
    name: 'item_id'
  })
  @ApiProperty({ example: 10, description: 'Id of the Item that the Cart Item represents' })
  itemId: number;

  // @ManyToOne(() => Cart)
  @Column({
    name: 'cart_id',
  })
  @ApiProperty({ example: 999, description: 'Id of the Cart which Cart Item belongs' })
  cartId: number;
}
