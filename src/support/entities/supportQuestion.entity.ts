import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SupportCategory } from './supportCategory.entity';

@Entity('support_questions')
export class SupportQuestion {
  @ApiProperty({
    type: Number,
    description: 'The id of the question',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    maxLength: 200,
    description: 'The question itself',
    example: 'How to choose which seller to buy from',
  })
  @Column({
    type: 'character varying',
    length: 200,
    nullable: false,
  })
  content: string;

  @ApiProperty({
    type: String,
    description: 'The answer itself',
    example: "Check the seller's reputation",
  })
  @Column({
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
