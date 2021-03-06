import {
  Column,
  CreateDateColumn,
  Entity,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Answer } from './answer.entity';
import { Type } from 'class-transformer';

import { Item } from '../../items/entities/items.entity';
import { User } from '../../users/entities/user.entity';

@Entity('questions')
export class Question {

  @ApiProperty({
    type: Number,
    description: 'Question Id',
    readOnly: true,
    example: 1,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  @Type(() => Number)
  id: number;

  @OneToOne(() => Answer)
  @JoinColumn({ name: 'answer_id' })
  @ApiProperty({
    type: Number,
    description: 'Id of answer',
    nullable: true,
    example: 2,
  })
  answerId?: number;

  @ManyToOne(() => Item, (item) => item.questions)
  @JoinColumn({ name: 'item_id' })
  @ApiProperty({
    type: Item,
    description: 'Id of the item where questions was asked',
    nullable: false,
    readOnly: true,
    example: 2,
  })
  item: Item;

  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    type: User,
    description: 'User that ask the question',
    nullable: false,
    readOnly: true,
    example: 2,
  })
  user: User;

  @ApiProperty({
    type: String,
    maxLength: 500,
    description: 'Answer content',
    example: 'Esto es una respuesta a tu pregunta.',
    nullable: false,
  })
  @Column({
    name: 'content',
    type: 'character varying',
    nullable: false,
    length: 500,
  })
  content: string;

  @ApiProperty({
    description: 'The date when question has been created',
    default: 'CURRENT_TIMESTAMP',
    type: Date,
    format: 'date-time',
    example: '2021-11-18T01:46:52.589Z',
    nullable: false,
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when question has been deleted',
    default: null,
    type: Date,
    nullable: true,
    format: 'date-time',
    example: '2021-11-18T01:46:52.589Z',
  })
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt?: Date;
}
