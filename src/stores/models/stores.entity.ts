import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Brand } from '../../brands/entities/brands.entity.ts';
import { User } from '../../users/entities/users.entity.ts';
import { Banner } from '../../banners/entities/banners.entity.ts';

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
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => Brand)
  @JoinColumn({
    name: 'brand_id',
  })
  brandId: Brand;

  @OneToOne(() => User)
  @Column({
    name: 'user_id',
  })
  userId: User;

  @OneToOne(() => Banner)
  @Column({
    name: 'banner_id',
  })
  bannerId: Banner;
}
