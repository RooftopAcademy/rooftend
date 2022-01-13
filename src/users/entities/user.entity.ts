import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { PolymorphicChildren } from 'typeorm-polymorphic';
import { ApiProperty } from '@nestjs/swagger';
import { PhotosEntity } from '../../photos/models/photos.entity';
import { Review } from '../../review/review.entity';
import { Search } from '../../search/entities/search.entity';
import { AccountStatusesEnum } from '../../account-status/models/AccountStatusesEnum';
import { Item } from '../../items/entities/items.entity';
import { History } from '../../history/models/history.entity';
import { SupportRequest } from '../../support/entities/supportRequest.entity';
import { Question } from '../../questions/entities/question.entity';

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
  @Column({ type: 'integer', nullable: false })
  account_status: AccountStatusesEnum;

  @ApiProperty({
    description: 'The date when the user has been soft deleted',
    default: null,
    type: 'date',
    format: 'date-time',
    example: '2021-12-16',
  })
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt?: Date;

  @Column({ name: 'completed', default: false })
  completed: boolean;

  @PolymorphicChildren(() => PhotosEntity, {
    eager: false,
  })
  photos: PhotosEntity[];

  /**
   * Reviews sent to other users
   */
  @OneToMany(() => Review, (review) => review.user)
  publishedReviews: Review[];

  /**
   * Reviews received from other users after buy
   */
  @PolymorphicChildren(() => Review, { eager: false })
  receivedReviews: Review[];

  entities: [];

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
  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  /**
   * A user can make many support requests
   */
  @OneToMany(() => SupportRequest, (supportRequest) => supportRequest.user)
  supportRequests: SupportRequest[];
}
