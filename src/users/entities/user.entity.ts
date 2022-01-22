import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Search } from '../../search/entities/search.entity';
import { History } from '../../history/models/history.entity';
import { AccountStatusesEnum } from '../../account-status/models/AccountStatusesEnum';
import { Item } from '../../items/entities/items.entity';
import { Question } from '../../questions/entities/question.entity';
import { SupportRequest } from '../../support/entities/supportRequest.entity';
import { UserReviews } from '../../review/entities/userReviews.entity';
import { Reviews } from '../../review/entities/reviews';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'User id number',
    type: Number,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    description: 'Username',
    type: String,
  })
  @Column({
    name: 'username',
    type: 'character varying',
    length: 50,
    nullable: true,
  })
  username: string;

  @ApiProperty({
    description: 'Password of user ',
    type: String,
  })
  @Column({
    name: 'password',
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  password: string;

  @ApiProperty({
    description: 'Email valid of user ',
    type: String,
  })
  @Column({
    name: 'email',
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    description: 'Account status assigned to that user ',
    type: Number,
  })
  @Column({
    type: 'integer',
    nullable: false,
    default: AccountStatusesEnum.PENDING,
  })
  account_status: AccountStatusesEnum;

  @ApiProperty({
    description: 'The date when the user has been soft deleted',
    default: null,
    type: 'date',
    format: 'date-time',
    example: '2022-01-14 18:27:50.29667+01',
  })
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt?: Date;

  @Column({ name: 'completed', default: false })
  completed: boolean;

  /**
   * Reviews sent to other users
   */
  @OneToMany(() => UserReviews, (review) => review.user)
  publishedReviews: Reviews[];

  /**
   * Reviews received from other users after buy
   */
  @OneToMany(() => UserReviews, (review) => review.user)
  receivedReviews: UserReviews[];

  /**
   * Published items bookmarked by the user
   */
  favorites: Array<Item> = [];

  /**
   * Items published by the user
   */
  @OneToMany(() => Item, (item) => item.user)
  items: Item[];


  /**
   * Search keywords from this user
   */
  @OneToMany(() => Search, (search) => search.user)
  searches: Search[];

  @OneToMany(() => History, (visit) => visit.user_id)
  visits: History[];

  /**
   * Questions sent by the user
   */
  @OneToMany((type) => Question, (question) => question.user)
  questions: Question[];

  /**
   * A user can make many support requests
   */
  @OneToMany(() => SupportRequest, (supportRequest) => supportRequest.user)
  supportRequests: SupportRequest[];
}
