import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SupportCategory } from './supportCategory.entity';

/**
 * A SupportQuestion represents a solved and explained issue, belonging to
 * a certain support category, with its own question and answer.
 */
@Entity('support_questions')
export class SupportQuestion {
  @ApiProperty({
    type: Number,
    description: 'The id of the question',
    example: 1,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;


  @ApiProperty({
    description: 'The date when has been created',
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
    type: String,
    maxLength: 200,
    description: 'The question itself',
    example: 'How to choose which seller to buy from',
  })
  @Column({
    name: 'content',
    type: 'character varying',
    length: 200,
    nullable: false,
  })
  content: string;

  @ApiProperty({
    type: String,
    description: 'The answer itself',
    example: "Check the seller's reputation",
    nullable: false,
  })
  @Column({
    name: 'answer',
    type: 'character varying',
    nullable: false,
  })
  answer: string;

  @ApiProperty({
    type: Number,
    description: 'The id of the category to which the question belongs',
    example: 1,
    nullable: false,
  })
  @ManyToOne(
    () => SupportCategory,
    (supportCategory) => supportCategory.questions,
    { nullable: false },
  )
  @JoinColumn({ name: 'category_id' })
  category: SupportCategory;
}
