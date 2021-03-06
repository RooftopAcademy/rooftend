import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Search } from '../../search/entities/search.entity';
import { History } from '../../history/models/history.entity';
import { AccountStatusesEnum } from '../../account-status/models/AccountStatusesEnum';
import { Item } from '../../items/entities/items.entity';
import { Question } from '../../questions/entities/question.entity';
import { SupportRequest } from '../../support/entities/supportRequest.entity';
import { UserReviews } from '../../review/entities/userReviews.entity';
import { Reviews } from '../../review/entities/reviews';
import { Likes } from '../../review/entities/likes.entity';

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

  @ApiHideProperty()
  @Column({
    name: 'password',
    type: 'character varying',
    length: 100,
    nullable: false,
    select: false,
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

  @ApiHideProperty()
  @Column({
    type: 'integer',
    nullable: false,
    name: 'account_status',
    default: AccountStatusesEnum.PENDING,
    enum: AccountStatusesEnum,
    select: false,
  })
  account_status: AccountStatusesEnum;

  @ApiHideProperty()
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
    select: false,
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

  @OneToMany(() => Likes, (like) => like.user)
  likes: Likes[];
  /**
   * Published items bookmarked by the user
   */
  // favorites: Array<Item> = [];

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
