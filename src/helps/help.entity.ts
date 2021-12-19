import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../categories/categories.entity";
import { Question } from "../questions/entities/question.entity";

@Entity({ name: 'help' })
export class Help {
  @ApiProperty({
    type: Number,
    description: 'The id of the help.',
    readOnly: true,
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    example: '2021-11-27T17:03:41.356Z',
    type: Date,
    format: 'date-time',
    description: 'Creation date.',
    default: 'Current date',
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty({
    type: Category,
    description: "The help's category",
    example: 'Categría de ventas.',
    required: true,
  })
  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  categoryId: number;

  @OneToMany(() => Question, questions => questions.helpId)
  questions: Question[];

  @ApiProperty({
    example: '2021-11-27T17:03:41.356Z',
    type: Date,
    format: 'date-time',
    description: 'Soft-deletion date. Null by default.',
    default: null,
    required: false,
  })
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;
}