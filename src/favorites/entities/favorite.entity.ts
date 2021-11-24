import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ManyToOne } from 'typeorm';

import { Item } from '../../items/entities/item.entity'
import { User } from '../../users/entities/user.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @Column({
    unsigned: true,
    type: 'bigint',
  })
  user_id: number;

  @Column({
    unsigned: true,
    type: 'bigint',
  })
  item_id: number;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(type => Item, item => item.favorites)
  item: Item;

  @ManyToOne(type => User, user => user.favorites)
  user: User;
}
