import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
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
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn({ unsigned: true, type: 'bigint' })
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
    default: 'CURRENT_TIMESTAMP',
    select: false,
  })
  @ApiHideProperty()
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
    type: 'timestamptz',
    default: 'CURRENT_TIMESTAMP',
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
  user: User;

  @Column({ type: 'double precision', default: 0 })
  @ApiProperty({
    name: 'amount',
    type: 'integer',
    example: '666',
    description: 'Item amount in this cart',
    default: '0',
  })
  amount: number;

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
    default: 'ARS',
  })
  currencyCode: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cartId)
  cartItems: CartItem[];

}
