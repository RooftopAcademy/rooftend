import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

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

  @ApiProperty({
    type: String,
    maxLength: 100,
    description: 'search keywords',
    example: 'palabra clave',
  })
  @Column({
    name: 'keywords',
    type: 'character varying',
    length: 100,
  })
  keywords: string;

  @ApiProperty({
    description: 'The timestamp of the creation',
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
}
