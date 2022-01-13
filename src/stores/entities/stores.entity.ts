import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
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
    default: () => 'CURRENT_TIMESTAMP',
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

  @OneToOne(() => Brand)
  @JoinColumn({
    name: 'brand_id',
  })
  brand: Brand;

  @ApiProperty({
    type: 'bigint',
    description: 'The brand to which the store belongs',
  })
  @Column({
    name: 'brand_id',
    type: 'bigint',
    nullable: false,
  })
  brandId: number;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ApiProperty({
    type: User,
    description: 'The user to who the store belongs',
  })
  @Column({
    name: 'user_id',
    type: 'bigint',
    nullable: false,
  })
  userId: number;
}
