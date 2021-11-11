import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stores')
export class StoresEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    name: 'brand_id',
    type: 'integer',
  })
  brandId: number;

  @Column({
    name: 'user_id',
    type: 'integer',
  })
  userId: number;

  @Column({
    name: 'banner_id',
    type: 'integer',
  })
  bannerId: number;
}
