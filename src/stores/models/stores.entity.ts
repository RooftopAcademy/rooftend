import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { Brand } from '../../brands/entities/brands.entity';
import { User } from '../../users/entities/user.entity';

@Entity('stores')
export class StoresEntity {
  @ApiProperty({
    type: Number,
    description: 'Store Id',
  })
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'Created date',
  })
  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'Updated date',
  })
  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Brand,
    description: 'The brand to which the store belongs',
  })
  @OneToOne(() => Brand)
  @JoinColumn({
    name: 'brand_id',
  })
  brandId: Brand;

  @ApiProperty({
    type: User,
    description: 'The user to who the store belongs',
  })
  @OneToOne(() => User)
  @Column({
    type: 'bigint',
    name: 'user_id',
  })
  userId: User;

  // @ApiProperty({
  //   type: Banner,
  //   description: "The store's banner",
  // })
  // @OneToOne(() => Banner)
  // @Column({
  //   name: 'banner_id',
  //   type: 'integer',
  // })
  // bannerId: Banner;
}
