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
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Help } from '../../helps/help.entity';

@Entity()
export class QuestionsEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  // @ManyToOne(type => ItemEntity, item => item.questions)
  // item: ItemEntity;

  // @ManyToOne(type => UserEntity, user => user.questions)
  // user: UserEntity;

  @ApiProperty({
    type: () => Help,
    description: 'The question can belong to a help category.',
    example: 2,
    required: false,
  })
  @JoinColumn({ name: 'help_id'})
  @ManyToOne(() => Help, (help) => help.questions)
  helpId: number | null;

  @Column({
    name: 'question',
    type: 'character varying',
    nullable: false,
  })
  questionContent: string;

  @Column({
    name: 'answer',
    type: 'character varying',
    nullable: true,
  })
  answer: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
