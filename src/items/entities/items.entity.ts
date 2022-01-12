import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
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
    default: 'CURRENT_TIMESTAMP',
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
    default: 'CURRENT_TIMESTAMP',
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
  })
  @ApiProperty({
    example: 10,
    description: 'Item Stock',
  })
  stock: number;

  @ManyToOne(() => Brand)
  @JoinColumn({
    name: 'brand',
  })
  @ApiProperty({
    example: 10,
    description: 'Brand of item',
    nullable: true,
  })
  brand?: Brand;

  @ManyToOne(() => User, user => user.items)
  @JoinColumn({
    name: 'user_id',
  })
  @ApiProperty({ example: 999, description: 'Id of the item owner' })
  userId: number;

  @ManyToOne(() => Category)
  @JoinColumn({
    name: 'category_id',
  })
  @ApiProperty({ example: 999, description: 'Id of the Item Category' })
  categoryId: Category;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cartId)
  cartItemsId: CartItem[];

  @OneToMany(() => Question, (question) => question.itemId)
  questions: Question[];

  @OneToMany(() => History, (visit) => visit.item_id)
  visits: History[];
}
