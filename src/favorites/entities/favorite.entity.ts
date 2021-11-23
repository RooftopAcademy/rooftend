import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// import { ManyToOne } from 'typeorm';

// import { Item } from '../../items/entities/item.entity'
// import { User } from '../../users/entities/user.entity';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  @ApiProperty({ example: 1, description: 'The record ID' })
  id: number;

  @Column({
    unsigned: true,
    type: 'bigint',
  })
  @ApiProperty({
    example: '8',
    description: 'The user ID who added the item to favorites',
  })
  user_id: number;

  @Column({
    unsigned: true,
    type: 'bigint',
  })
  @ApiProperty({
    example: '3',
    description: 'The Item ID that was added to favorites',
  })
  item_id: number;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '3',
    description: 'The date the record was last updated',
  })
  updatedAt: Date;

  // @ManyToOne(type => Item, item => item.favorites)
  // item: Item;

  // @ManyToOne(type => User, user => user.favorites)
  // user: User;
}
