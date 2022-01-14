import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Brand } from '../../brands/entities/brands.entity';
import { User } from '../../users/entities/user.entity';

@Entity('stores')
export class Store {
  @ApiProperty({
    type: Number,
    description: 'Store Id',
    example: 265,
    readOnly: true,
  })
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    type: Date,
    format: 'date-time',
    description: 'Created date',
    example: '2021-11-26T20:24:45.386Z',
    default: 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: 'Updated date',
    example: '2021-11-26T20:24:45.386Z',
    readOnly: true,
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
  })
  updatedAt: Date;

  @OneToOne(() => Brand, (brand) => brand.store)
  @ApiProperty({
    type: Brand,
    example: 4,
    description: 'The brand to which the store belongs',
  })
  @JoinColumn({
    name: 'brand_id',
  })
  brand: Brand;

  @OneToOne(() => User)
  // (user) => user.store
  @ApiProperty({
    type: User,
    example: '',
    description: 'The user to who the store belongs',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  // Relación con items?
}
