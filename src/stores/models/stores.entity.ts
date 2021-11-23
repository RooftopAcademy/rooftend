import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({
    example: 6549,
    description: 'The Id of the brand to which the store belongs'
  })
  @OneToOne(() => Brand)
  @JoinColumn({
    name: 'brand_id',
  })
  brandId: Brand;

  @ApiProperty({
    example: 87897,
    description: 'The Id of the user to which the store belongs'
  })
  @OneToOne(() => User)
  @Column({
    name: 'user_id',
  })
  userId: User;

  @ApiProperty({
    example: 324579,
    description: 'The Id of the store\'s banner'
  })
  @OneToOne(() => Banner)
  @Column({
    name: 'banner_id',
  })
  bannerId: Banner;
}
