import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Type } from 'class-transformer';

/**
 * Represents a review given by an user to another entity.
 */
@Entity('reviews')
export class Review {
  @ApiProperty({
    type: Number,
    description: 'The id of the review.',
    required: false,
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Type(() => Number)
  id: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The id of the reviewer.',
    example: 1,
  })
  @Column({ name: 'user_id', type: 'bigint' })
  @Type(() => Number)
  userId: number;

  @ApiProperty({
    type: Number,
    description: 'The id of the reviewed entity.',
    required: true,
    example: 1,
  })
  @Column({ name: 'subject_id', type: 'bigint' })
  @Type(() => Number)
  subjectId: number;

  @ApiProperty({
    type: String,
    maxLength: 10,
    required: true,
    description: 'The type of the reviewed entity. Must match an entity name.',
    example: 'Item',
  })
  @Column({ name: 'subject_type', type: 'varchar', length: 10 })
  subjectType: string;

  @ApiProperty({
    type: String,
    maxLength: 500,
    required: true,
    description: 'The body of the review.',
    example: 'This product is very useful.',
  })
  @Column({ name: 'comment', type: 'varchar', length: 500 })
  comment: string;

  @ApiProperty({
    type: Number,
    minimum: 1,
    maximum: 5,
    required: true,
    description:
      'Integer representing the score the user gave to the reviewed entity.',
  })
  @Column({ name: 'score', type: 'smallint' })
  score: number;

  @ApiProperty({
    type: Date,
    required: true,
    default: 'now()',
    example: '2021-11-12T01:46:52.589Z',
    description: 'The timestamp of the creation of the review.',
  })
  @Column({ name: 'created_at', type: 'timestamp with time zone' })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    type: Date,
    required: true,
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
