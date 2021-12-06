import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Item } from '../../items/entities/items.entity';

@Entity('favorite')
export class Favorite {
  @ApiProperty({
    type: 'integer',
    description: 'The ID of the Favorite record.',
    nullable: false,
    readOnly: true,
    example: 1,
  })
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'integer',
  })
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    type: 'integer',
    description: 'The user ID who added the item to favorites',
    nullable: false,
    readOnly: true,
    example: 8,
  })
  user_id: number;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'item_id' })
  @ApiProperty({
    type: 'integer',
    description: 'The Item ID that was added to favorites',
    nullable: false,
    readOnly: true,
    example: 3,
  })
  item_id: number;

  @ApiProperty({
    type: Date,
    format: 'date',
    default: 'now()',
    description: 'The date the record was last updated',
    example: '2021-11-15 17:32:19.537+00',
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
