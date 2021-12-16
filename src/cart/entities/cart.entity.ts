import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeUpdate,
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
  })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    name: 'createdAt',
    type: 'string',
    format: 'date-time',
    readOnly: true,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    name: 'updatedAt',
    type: 'string',
    format: 'date-time',
    readOnly: true,
  })
  updatedAt: Date;

  // @BeforeUpdate()
  // updateTimeStamp() {
  //   this.updatedAt = new Date();
  // }

  @UpdateDateColumn({
    name: 'purchased_at',
    nullable: true,
    type: 'timestamptz',
    default: () => null,
  })
  @ApiProperty({
    name: 'purchasedAt',
    type: 'string',
    format: 'date-time',
    readOnly: true,
    default: null,
  })
  purchasedAt: Date;

  @ManyToOne(() => User)
  @ApiProperty({
    name: 'userId',
    type: 'integer',
    example: 1,
    description: 'Id of the user the Cart belongs to',
  })
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column({ type: 'double precision' })
  @ApiProperty({
    name: 'amount',
    type: 'integer',
    required: true,
    example: '666',
    description: 'Item amount in this cart',
  })
  amount: number;

  @Column('character varying', { length: 3, name: 'currency_code' })
  @Column({
    length: 3,
    name: 'currency_code',
    type: "character varying"
  })
  @ApiProperty({
    name: 'currencyCode',
    required: true,
    type: 'string',
    example: 'ab6',
    description: 'Currency code of the user location',
    maxLength: 3,
  })
  currencyCode: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cartId)
  cartItemsId: CartItem[];
}
