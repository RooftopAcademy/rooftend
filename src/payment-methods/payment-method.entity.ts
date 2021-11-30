import { ApiProperty } from '@nestjs/swagger'; /* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'payment_methods',
})
export default class PaymentMethod {
  @ApiProperty({
    example: 1,
    description: 'Payment method ID number',
    type: Number,
    readOnly: true,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    example: 'CASH',
    description: 'The name of the payment method',
    type: String,
  })
  @Column({
    name: 'name',
    type: 'character varying',
    length: 15,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    example: 'Cash',
    description: 'The type of the payment method, usually similar to the name',
    type: String,
  })
  @Column({
    name: 'type',
    type: 'character varying',
    length: 15,
    nullable: false,
  })
  type: string;

  @ApiProperty({
    example: '2021-11-15 17:32:19.537+00',
    description: 'The timestamp when the the payment method was created',
    type: Date,
    readOnly: true,
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @ApiProperty({
    example: '2021-11-15 17:32:19.537+00',
    description:
      'The timestamp when the the payment method was updated for the last time',
    type: Date,
    readOnly: true,
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
