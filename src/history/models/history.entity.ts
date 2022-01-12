import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Item } from '../../items/entities/items.entity';

@Entity('history')
export class History {
  @ApiProperty({ example: 1, description: 'The id of the History' })
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
  @JoinColumn({ name: 'item_id' })
  item_id: Item;
  

  @ApiProperty({
    default: 'now()',
    type: Date,
    description: 'The date-time that was created',
  })
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt?: Date;
}
