import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Item } from '../../items/entities/items.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('saved_items')
export class SavedItem {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  @ApiProperty({
    example: 1,
    description: 'The id of the saved item',
    type: Number,
  })
  id: number;

  @ManyToMany(() => Item)
  @JoinTable({ name: 'item_id' })
  @ApiProperty({
    type: Item,
  })
  item: Item;

  @ManyToMany(() => User)
  // @ManyToOne(() => User)
  // user => user.savedItems
  @JoinTable({ name: 'user_id' })
  @ApiProperty({
    type: User,
  })
  user: User;

  @Column({
    name: 'quantity',
    type: 'int',
    nullable: false,
  })
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'The id of the user',
    type: 'int',
    nullable: false,
  })
  quantity: number;

  @Column({
    name: 'price',
    type: 'int',
    nullable: false,
  })
  @ApiProperty({
    example: 1,
    description: 'The id of the user',
    type: 'int',
    nullable: false,
  })
  price: number;
}
