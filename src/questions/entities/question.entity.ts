import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Answer } from '../../answers/entities/answer.entity';
import { Type } from 'class-transformer';
import { Item } from '../../items/entities/items.entity';

@Entity('questions')
export class Question {

  @ApiProperty({
    type: Number,
    description: 'Question Id',
    readOnly: true,
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Type(() => Number)
  id: number;

  @OneToOne(() => Answer, answer => answer.questionId)
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
    type: Number,
    description: 'Id of the item where questions was asked',
    nullable: false,
    readOnly: true,
    example: 2,
  })
  itemId: number;

  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    type: Number,
    description: 'Id of who ask the question',
    nullable: false,
    readOnly: true,
    example: 2,
  })
  userId: number;


  @Column({
    name: 'content',
    type: 'character varying',
    nullable: false,
  })
  content: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when question has been deleted',
    default: null,
    type: Date,
    format: 'date-time',
    example: '2021-12-19',
  })
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt?: Date;
}
