import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';
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

  @BeforeUpdate()
  updateTimeStamp() {
    this.updatedAt = new Date();
  }

  @UpdateDateColumn({
    name: 'purchased_at',
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    name: 'purchasedAt',
    type: 'string',
    format: 'date-time',
    readOnly: true,
  })
  purchasedAt: Date;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    name: 'userId',
    type: 'integer',
    example: 1,
    description: 'Id of the user the Cart belongs to',
  })
  userId: User;

  @Column({ type: 'double precision' })
  @ApiProperty({
    name: 'amount',
    type: 'integer',
    required: true,
    example: '666',
    description: 'Item amount in this cart',
  })
  amount: number;

  @Column('varchar', { length: 3, name: 'currency_code' })
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
