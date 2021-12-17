import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carts')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;
}
