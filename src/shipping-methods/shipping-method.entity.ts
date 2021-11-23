
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shipping_methods')
export class ShippingMethod {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint'
  })
  id: number;

  @Column({
    type: 'character varying',
    length: 100
  })
  name: string;

  @Column({
    name: 'photo_id'
  })
  photoId: number;
}
