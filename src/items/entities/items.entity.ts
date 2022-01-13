import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/entities/user.entity';
import { Brand } from '../../brands/entities/brands.entity';
import { Category } from '../../categories/entities/categories.entity';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { Question } from '../../questions/entities/question.entity';
import { History } from '../../history/models/history.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  @ApiProperty({
    readOnly: true,
    type: Number,
    example: 1,
    description: 'Item ID',
  })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  @ApiProperty({
    example: '2016-03-26 10:10:10-05:00',
    description: "Item's creation date",
    default: 'CURRENT_TIMESTAMP',
    type: Date,
    format: 'date-time',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  @ApiProperty({
    default: 'CURRENT_TIMESTAMP',
    type: Date,
    format: 'date-time',
    example: '2016-03-26 10:10:10-05:00',
    description: "Item's last update date",
  })
  updatedAt: Date;

  @Column({
    name: 'title',
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
    description: 'Item title',
    nullable: false,
    maxLength: 100,
  })
  title: string;

  @Column({
    name: 'description',
    type: 'character varying',
    length: 1000,
    nullable: false,
  })
  @ApiProperty({
    example: 'Imitaciones de varitas de sauco para el mago coleccionista',
    description: 'Item description',
    nullable: false,
    maxLength: 1000,
  })
  description: string;

  @Column({
    name: 'price',
    type: 'float',
    nullable: false,
  })
  @ApiProperty({
    nullable: false,
    example: 1050.99,
    description: 'Item Price',
    type: Number,
  })
  price: number;

  @Column({
    type: 'int',
    name: 'stock',
    nullable: false,
  })
  @ApiProperty({
    nullable: false,
    example: 10,
    description: 'Item Stock',
    type: Number,
  })
  stock: number;

  @ManyToOne(() => Brand)
  @JoinColumn({
    name: 'brand',
  })
  @ApiProperty({
    type: Brand,
    example: 10,
    description: 'Brand of item',
    nullable: true,
  })
  brand?: Brand;

  @ManyToOne(() => User, (user) => user.items, { eager: true })
  @JoinColumn({
    name: 'user_id',
  })
  @ApiProperty({ type: () => User })
  user: User;

  @ManyToOne(() => Category)
  @JoinColumn({
    name: 'category_id',
  })
  @ApiProperty({ example: 999, description: 'Id of the Item Category' })
  categoryId: Category;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cartId)
  cartItemsId: CartItem[];

  @OneToMany(() => Question, (question) => question.item)
  questions: Question[];

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
  })
  deletedAt?: Date;

  @OneToMany(() => History, (visit) => visit.item_id)
  visits: History[];

  /**
   * Check if item has availability
   * @param qty
   */
  public isAvailable(qty = 0): boolean {
    return this.stock > qty;
  }

  /**
   * Check if item is active
   * @description Item can be inactive when has been paused by the publisher or the admin
   * @param void
   */
  public isActive(): boolean {
    return true;
  }

  /**
   * Get final price for given quantity
   * @param qty
   */
  getFinalPrice(qty = 1): number {
    return this.price * qty;
  }
}
