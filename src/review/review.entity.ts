import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Type(() => Number)
  id: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.reviews, { eager: true })
  user: User;

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
