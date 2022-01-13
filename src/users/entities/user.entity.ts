import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { PolymorphicChildren } from 'typeorm-polymorphic';
import { ApiProperty } from '@nestjs/swagger';
import { PhotosEntity } from '../../photos/models/photos.entity';
import { Review } from '../../review/review.entity';
import { Search } from '../../search/entities/search.entity';
import { AccountStatusesEnum } from '../../account-status/models/AccountStatusesEnum';
import { AccountStatusEntity } from '../../account-status/models/account-status.entity';
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
  @Column({ type: 'character varying', length: 50, nullable: false })
  username: string;

  @ApiProperty({
    description: 'Password of user ',
    type: String,
  })
  @Column({ type: 'character varying', length: 100, nullable: false })
  password: string;

  @ApiProperty({
    description: 'Email valid of user ',
    type: String,
  })
  @Column({ type: 'character varying', length: 100, nullable: false })
  email: string;

  @ApiProperty({
    description: 'Account status assigned to that user ',
    type: Number,
  })
  @Column({ type: 'integer', nullable: false })
  account_status: AccountStatusesEnum;

  @Column({ default: false })
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
  @OneToMany(() => Item, (item) => item.userId)
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
