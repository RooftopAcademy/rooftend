import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('favorite')
export class Favorite {
  @ApiProperty({
    type: "integer",
    description: 'The ID of the Favorite record.',
    example: 1,
    readOnly: true,
  })
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    type: "integer",
    description: 'The user ID who added the item to favorites',
    example: 8,
    readOnly: true,
  })
  @Column({
    name: 'user_id',
    unsigned: true,
    type: 'bigint',
  })
  user_id: number;

  @ApiProperty({
    type: "integer",
    description: 'The Item ID that was added to favorites',
    example: 3,
    readOnly: true,
  })
  @Column({
    name: 'item_id',
    unsigned: true,
    type: 'bigint',
  })
  item_id: number;

  @ApiProperty({
    format: 'date',
    description: 'The date the record was last updated',
    example: '2021-11-15 17:32:19.537+00',
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // @ManyToOne(type => Item, item => item.favorites)
  // item: Item;

  @ManyToOne((type) => User, (user) => user.favorites)
  user: User;
}
