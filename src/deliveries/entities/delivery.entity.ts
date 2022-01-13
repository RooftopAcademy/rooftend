import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import DeliveryStatus from './delivery-status.enum';

@Entity({
  name: 'deliveries',
})
export class Delivery {
  @ApiProperty({
    description: 'Delivery Id number',
    type: 'integer',
    example: 1,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    description: 'The date when the delivery is created',
    default: 'Current date',
    type: 'date',
    format: 'date-time',
    example: '2021-12-14',
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the delivery is updated',
    default: 'Current date',
    type: 'date',
    format: 'date-time',
    example: '2021-12-14',
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Cart Id number',
    type: 'integer',
    example: 1,
  })
  @Column({
    name: 'cart_id',
    unsigned: true,
    type: 'bigint',
  })
  cartId: number;

  @ApiProperty({
    description: 'Shipping Method Id number',
    type: 'integer',
    example: 1,
  })
  @Column({
    name: 'shipping_method_id',
    unsigned: true,
    type: 'bigint',
  })
  shippingMethod: number;

  @ApiProperty({
    description: 'Delivery Status',
    type: 'enum',
    default: DeliveryStatus.PENDING,
    example: DeliveryStatus.PENDING,
  })
  @Column({
    type: 'char',
    length: 20,
    default: DeliveryStatus.PENDING,
  })
  status: DeliveryStatus;
}
