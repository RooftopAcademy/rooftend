import {
  ApiHideProperty,
  ApiProperty
} from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint'
  })
  @ApiProperty({
    name: 'id',
    type: 'integer',
    readOnly: true,
    example: 1,
  })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
    select: false,
  })
  @ApiHideProperty()
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
    type: 'timestamptz',
    select: false,
  })
  @ApiHideProperty()
  updatedAt: Date;

  @UpdateDateColumn({
    name: 'purchased_at',
    nullable: true,
    type: 'timestamptz',
    default: null,
  })
  @ApiProperty({
    name: 'purchasedAt',
    type: 'string',
    format: 'date-time',
    readOnly: true,
    default: null,
    example: '2021-12-13T03:00:00.000Z',
  })
  purchasedAt: Date;

  @ManyToOne(() => User)
  @ApiHideProperty()
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column({ type: 'double precision', default: 0 })
  @ApiProperty({
    name: 'amount',
    type: 'integer',
    required: true,
    example: '666',
    description: 'Item amount in this cart',
  })
  amount: number;

<<<<<<< HEAD

=======
>>>>>>> c3beef905c1580e32126b2865ed80567b7bb5ada
  @Column({
    length: 3,
    name: 'currency_code',
    type: 'character varying',
    default: 'ARS',
  })
  @ApiProperty({
    name: 'currencyCode',
    required: true,
    type: 'string',
    example: 'ARS',
    description: 'Currency code of the user location',
    maxLength: 3,
  })
  currencyCode: string;

  /**
   * Items to be purchased
   */
  @OneToMany(() => CartItem, (item : CartItem) => item.cartId)
  items : CartItem[]

  /**
   * @deprecated User items attribute instead of cartItemsId
   */
  @OneToMany(() => CartItem, (cartItem) => cartItem.cartId)
  cartItemsId: CartItem[];
}
