import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('history')
export class History {
  @ApiProperty({ example: 1, description: 'The id of the History' })
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @OneToOne(() => User)
  @Column({
    name: 'user_id',
    type: 'bigint',
    unsigned: true,
  })
  @ApiProperty({ example: 1, description: 'The user that has the history' })
  user_id: number;

  // @OneToOne(() => Item)
  // @Column({
  //   name:'item_id',
  //   type: 'bigint',
  //   unsigned: true,
  // })
  // @ApiProperty({ example: 1, description: 'The item that the user visited' })
  // item_id: number;

  @ApiProperty({
    default: 'Current date',
    type: Date,
    description: 'The date-time that was created',
  })
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
