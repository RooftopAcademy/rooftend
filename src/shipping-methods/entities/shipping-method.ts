
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShippingMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  photoId: number;
}
