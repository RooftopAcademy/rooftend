import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
} from 'typeorm';
import { opinionsEnum } from './opinions.enum';
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
}
