import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity('searches')
export class Search {
  @ApiProperty({
    type: Number,
    description: 'The id of the search.',
    readOnly: true,
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Type(() => Number)
  id: number;

  @ApiProperty({
    type: User,
    nullable: true,
    description: 'The user who made the search.',
  })
  @ManyToOne(() => User, (user) => user.searches, { eager: true })
  user?: User;

  @Column({ type: 'character varying', length: 100 })
  keywords: string;

  @ApiProperty({
    type: Date,
    default: 'now()',
    example: '2021-11-12T01:46:52.589Z',
    description: 'The timestamp of the creation of the review.',
  })
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  @Type(() => Date)
  createdAt: Date;
}
