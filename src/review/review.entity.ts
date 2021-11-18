import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import { PolymorphicParent } from 'typeorm-polymorphic';

@Entity('reviews')
export class Review implements PolymorphicChildInterface {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Type(() => Number)
  id: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.reviews, { eager: true })
  user: User;

  @PolymorphicParent(() => User)
  subject: User;

  @Column({ name: 'subject_id', type: 'bigint' })
  @Type(() => Number)
  entityId: number;

  @Column({ name: 'subject_type', type: 'varchar', length: 10 })
  entityType: string;

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
