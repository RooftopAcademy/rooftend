import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
<<<<<<< HEAD
import { User } from '../../users/entities/user.entity';
import { Brand } from '../../brands/entities/brands.entity';
// import { Banner } from '../../banners/entities/banner.entity';
=======
import { Brand } from '../../brands/entities/brands.entity';
import { User } from '../../users/entities/user.entity';
>>>>>>> bbb407f8efef3984e93a845355b607a40b2b527e

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
<<<<<<< HEAD
  //   description: 'The store\'s banner'
=======
>>>>>>> bbb407f8efef3984e93a845355b607a40b2b527e
  // })
  // @OneToOne(() => Banner)
  // @Column({
  //   name: 'banner_id',
  //   type: 'integer',
  // })
  // bannerId: Banner;
}
