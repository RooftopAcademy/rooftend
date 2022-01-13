import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

/**
 * A SupportRequest may be a question made by a user or
 * the answer to a question referred on the replyTo field.
 */
@Entity('support_requests')
export class SupportRequest {
  @ApiProperty({
    type: Number,
    description: 'The id of the request',
    example: 1,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    description: 'The date when has been created',
    default: () => 'CURRENT_TIMESTAMP',
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

  @ApiProperty({
    type: String,
    description:
      'The content may be a question or an answer, depending on the reply_on field being null or not respectively',
    example: "The system doesn't let me post an item, what's wrong?",
  })
  @Column({
    name: 'content',
    type: 'character varying',
    nullable: false,
  })
  content: string;

  @ApiProperty({
    type: Number,
    description: 'The user who made the request or provides the support',
    example: 23,
  })
  @ManyToOne(() => User, (user) => user.supportRequests, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({
    type: Number,
    description:
      'The id of the initial question to which this supportRequest is offering an answer',
    example: 1,
    default: null,
    nullable: true,
  })
  @OneToOne(() => SupportRequest, { nullable: true })
  @JoinColumn({ name: 'reply_to' })
  replyTo?: SupportRequest | null;
}
