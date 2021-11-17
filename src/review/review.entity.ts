import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Type } from 'class-transformer';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Type(() => Number)
  id: number;

  @Column({ name: 'user_id', type: 'bigint' })
  @Type(() => Number)
  userId: number;

  @Column({ name: 'subject_id', type: 'bigint' })
  @Type(() => Number)
  subjectId: number;

  @Column({ name: 'subject_type', type: 'varchar', length: 10 })
  subjectType: string;

  @Column({ name: 'comment', type: 'varchar', length: 500 })
  comment: string;

  @Column({ name: 'score', type: 'smallint' })
  score: number;

  @Column({ name: 'created_at', type: 'timestamp with time zone' })
  @Type(() => Date)
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp with time zone' })
  @Type(() => Date)
  updatedAt: Date;
}