import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Help } from '../../helps/help.entity';
import { User } from '../../users/entities/user.entity';
import { Answer } from '../../answers/entities/answer.entity';
import { Type } from 'class-transformer';
import { Item } from '../../items/entities/items.entity';

@Entity()
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

  @OneToOne(() => Answer, {
    eager: true,
  })
  @JoinColumn()
  @ApiProperty({
    type: Number,
    description: 'Id of answer',
    nullable: true,
    example: 2,
  })
  answerId: number;

  @ManyToOne(() => Item)
  @JoinColumn()
  @ApiProperty({
    type: Number,
    description: 'Id of the item where questions was asked',
    nullable: false,
    readOnly: true,
    example: 2,
  })
  itemId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    type: Number,
    description: 'Id of who ask the question',
    nullable: false,
    readOnly: true,
    example: 2,
  })
  userId: number;

  @ApiProperty({
    type: () => Help,
    description: 'The question can belong to a help category.',
    example: 2,
    required: false,
  })
  @JoinColumn({ name: 'help_id' })
  @ManyToOne(() => Help, (help) => help.questions)
  helpId: number | null;

  @Column({
    name: 'question',
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
