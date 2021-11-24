import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Brand } from 'src/brands/entities/brands.entity';
import { Banner } from 'src/banners/entities/banners.entity';

@Entity('stores')
export class StoresEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'Created date'
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
    description: 'Updated date'
  })
  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Brand,
    description: 'The brand to which the store belongs'
  })
  @OneToOne(() => Brand)
  @JoinColumn({
    name: 'brand_id',
  })
  brandId: Brand;

  @ApiProperty({
    type: User,
    description: 'The user to who the store belongs'
  })
  @OneToOne(() => User)
  @Column({
    name: 'user_id',
  })
  userId: User;

  @ApiProperty({
    type: Banner,
    description: 'The store\'s banner'
  })
  @OneToOne(() => Banner)
  @Column({
    name: 'banner_id',
  })
  bannerId: Banner;
}
