import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import PaymentStatus from './payment-status.enum';

@Entity({
  name: 'payments',
})
export class Payment {
  @ApiProperty({
    description: 'Payment Id number',
    type: 'integer',
    example: 1,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    description: 'The date when the payment is created',
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
    description: 'The date when the payment is updated',
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
    unsigned: true,
    type: 'bigint',
  })
  cart_id: number;

  @ApiProperty({
    description: 'Payment Method Id number',
    type: 'integer',
    example: 1,
  })
  @Column({
    name: 'payment_method_id',
    unsigned: true,
    type: 'bigint',
  })
  paymentMethod: number;

  @ApiProperty({
    description: 'Payment Status',
    type: 'enum',
    default: PaymentStatus.PENDING,
    example: PaymentStatus.PENDING,
  })
  @Column({
    type: 'char',
    length: 20,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;
}
