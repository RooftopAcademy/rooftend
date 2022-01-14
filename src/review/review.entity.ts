import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Type } from 'class-transformer';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { User } from '../users/entities/user.entity';

/**
 * Represents a review given by an user to another entity.
 */
@Entity('reviews')
export class Review implements PolymorphicChildInterface {
  @ApiProperty({
    type: Number,
    description: 'The id of the review.',
    readOnly: true,
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Type(() => Number)
  id: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.publishedReviews, { eager: true })
  @ApiProperty({
    type: () => User,
    description: 'The user who creates the review.',
  })
  user: User;

  @PolymorphicParent(() => User)
  @ApiProperty({
    type: () => User,
    description: `The entity who receives the review. Currently the only allowed is User.`,
  })
  subject: User;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'subject_id', type: 'bigint' })
  @Type(() => Number)
  entityId: number;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'subject_type', type: 'varchar', length: 10 })
  entityType: string;

  @ApiProperty({
    type: String,
    maxLength: 500,
    description: 'The body of the review.',
    example: 'Muy buena atención al cliente.',
  })
  @Column({ name: 'comment', type: 'varchar', length: 500 })
  comment: string;

  @ApiProperty({
    type: Number,
    minimum: 1,
    maximum: 5,
    description:
      'Integer representing the score the user gave to the reviewed entity.',
  })
  @Column({ name: 'score', type: 'smallint' })
  score: number;

  @ApiProperty({
    type: Date,
    default: 'now()',
    example: '2021-11-12T01:46:52.589Z',
    description: 'The timestamp of the creation of the review.',
  })
  @Column({ name: 'created_at', type: 'timestamp with time zone' })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    type: Date,
    default: 'now()',
    example: '2021-11-12T01:46:52.589Z',
    description: 'The timestamp of the creation of the review.',
  })
  @Column({
    name: 'updated_at',
    type: 'timestamp with time zone',
    nullable: false,
  })
  @Column({ name: 'updated_at', type: 'timestamp with time zone' })
  @Type(() => Date)
  updatedAt: Date;
}
