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
import { Category } from '../../categories/categories.entity';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { Question } from '../../questions/entities/question.entity';


@Entity('items')
export class Item {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  @ApiProperty({ example: 1, description: 'Item ID' })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2016-03-26 10:10:10-05:00',
    description: "Item's creation date",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2016-03-26 10:10:10-05:00',
    description: "Item's last update date",
  })
  updatedAt: Date;

  @Column({
    type: 'character varying',
    length: 100,
  })
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
    description: 'Item title',
  })
  title: string;

  @Column({
    type: 'character varying',
    length: 1000,
  })
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu',
    description: 'Item description',
  })
  description: string;

  @Column({
    type: 'float',
  })
  @ApiProperty({ example: 1050.99, description: 'Item Price' })
  price: number;

  @Column({
    type: 'int',
  })
  @ApiProperty({ example: 10, description: 'Item Stock' })
  stock: number;

  @ManyToOne(() => Brand)
  @JoinColumn({
    name: 'brand_id',
  })
  @ApiProperty({ example: 10, description: 'Id of the Item Brand' })
  brandId: Brand;

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
}
