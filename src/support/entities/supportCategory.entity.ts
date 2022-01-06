import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SupportQuestion } from './supportQuestion.entity';

@Entity('support_categories')
export class SupportCategory {
  @ApiProperty({
    type: Number,
    description: 'The id of the category',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    maxLength: 80,
    description: 'The name of the category',
    example: 'Admistrate and cancel purchases',
  })
  @Column({
    type: 'character varying',
    length: 80,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: String,
    maxLength: 150,
    description: 'A quick summary of the issue',
    example: 'Pay, track shipments, modify, complain or cancel purchases',
  })
  @Column({
    type: 'character varying',
    length: 150,
    nullable: false,
  })
  excerpt: string;

  /**
   * A supportCategory can have multiple questions
   */
  @OneToMany(
    () => SupportQuestion,
    (supportQuestion) => supportQuestion.category,
  )
  questions: SupportQuestion[];
}
