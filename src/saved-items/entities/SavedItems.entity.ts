import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Item } from '../../items/entities/items.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('saved_items')
export class SavedItemsEntity {
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

  @Column({
    type: 'bigint',
    name: 'item_id',
  })
  @ManyToMany(() => Item)
  @JoinTable()
  @ApiProperty({
    example: 1,
    description: 'The id of the item',
    type: 'bigint',
    nullable: false,
  })
  itemId: number;


  @ManyToMany(() => User)
  @JoinTable({ name: 'user_id' })
  @ApiProperty({
    example: 1,
    description: 'The id of the user',
    type: 'bigint',
    nullable: false,
  })
  userId: number;

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
