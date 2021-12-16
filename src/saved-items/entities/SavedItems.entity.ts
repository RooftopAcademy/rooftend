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
  })
  @ApiProperty({
    example: 1,
    description: 'The id of the saved item',
    type: 'bigint',
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

  @Column({
    type: 'bigint',
    name: 'user_id',
  })
  @ManyToMany(() => User)
  @JoinTable()
  @ApiProperty({
    example: 1,
    description: 'The id of the user',
    type: 'bigint',
    nullable: false,
  })
  userId: number;

  @Column({
    type: 'int',
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
    type: 'int',
  })
  @ApiProperty({
    example: 1,
    description: 'The id of the user',
    type: 'int',
    nullable: false,
  })
  price: number;
}
