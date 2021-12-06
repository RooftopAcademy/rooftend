import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Item } from '../../items/entities/items.entity';

@Entity('saved_items')
export class SavedItemsEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'bigint',
    name: 'item_id',
  })
  @ManyToMany(() => Item)
  @JoinTable()
  itemId: number;

  @Column({
    type: 'bigint',
    name: 'user_id',
  })
  @ManyToMany(() => User)
  @JoinTable()
  userId: number;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'int',
  })
  price: number;
}
