/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'payment_methods'
})
export default class PaymentMethod {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint'
  })
  id: number;

  @Column({
      name: 'name',
      type: 'character varying',
      length: 15
  })
  name: string;

  @Column({
    name: 'type',
    type: 'character varying',
    length: 15
})
  type: string;
}
