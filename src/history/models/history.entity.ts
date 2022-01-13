import {
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Item } from '../../items/entities/items.entity';
import { User } from '../../users/entities/user.entity';

@Entity('history')
export class History {
  @ApiProperty({
    example: 1,
    description: 'The id of the History',
    readOnly: true,
    type: Number,
  })
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @ManyToOne(() => User, (user) => user.visits)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ example: 1, description: 'The user that has the history' })
  user_id: Number;


  @ManyToOne(() => Item)
  @ApiProperty({
    example: 1,
    description: 'Item Id'
  })
  @JoinColumn({ name: 'item_id' })
  item_id: Item;


  @ApiProperty({
    default: 'now()',
    type: Date,
    description: 'The date-time that was created',
    nullable: false,
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;


  @ApiProperty({
    default: null,
    type: Date,
    description: 'The date-time that was deleted',
    nullable: true,
  })
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
    nullable: true,
  })
  deletedAt?: Date;
}
