import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stores')
export class StoresEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  brandId: number;

  @Column()
  userId: number;

  @Column()
  bannerId: number;
}
