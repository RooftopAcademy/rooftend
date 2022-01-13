import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SupportQuestion } from './supportQuestion.entity';

@Entity('support_categories')
export class SupportCategory {
  @ApiProperty({
    type: Number,
    description: 'The id of the category',
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
    default: 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({
    nullable: false,
    type: String,
    maxLength: 80,
    description: 'The name of the category',
    example: 'Admistrate and cancel purchases',
  })
  @Column({
    name: 'name',
    type: 'character varying',
    length: 80,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    nullable: false,
    type: String,
    maxLength: 150,
    description: 'A quick summary of the issue',
    example: 'Pay, track shipments, modify, complain or cancel purchases',
  })
  @Column({
    name: 'excerpt',
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
