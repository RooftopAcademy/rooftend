import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { opinionsEnum } from '../enum/opinions.enum';
import { Reviews } from './reviews';

@Entity('user_reviews')
export class UserReviews extends Reviews {

  @ApiProperty({
    type: opinionsEnum,
    description: 'buyers opinions about sellers',
    nullable: true,
    example: 'BAD'
  })
  @Column({
    nullable: true,
    name: 'opinion',
    type: 'enum',
    default: null,
    enum: opinionsEnum,
  })
  opinion: opinionsEnum;

  @ManyToOne(() => User, (user) => user.receivedReviews)
  @JoinColumn({ name: 'reviewed_id' })
  @ApiProperty({
    type: User,
    description: 'Id of the user that has been reviewed',
    nullable: false,
    readOnly: true,
    example: 2,
  })
  reviewed: User;
}
