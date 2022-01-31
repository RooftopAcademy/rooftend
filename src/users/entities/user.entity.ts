import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Search } from '../../search/entities/search.entity';
import { History } from '../../history/models/history.entity';
import { AccountStatusesEnum } from '../../account-status/models/AccountStatusesEnum';
import { Item } from '../../items/entities/items.entity';
import { Question } from '../../questions/entities/question.entity';
import { Review } from '../../review/review.entity';
import { SupportRequest } from '../../support/entities/supportRequest.entity';
import { Store } from '../../stores/entities/stores.entity';
import { Address } from '../../addresses/entities/address.entity';

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
  @OneToMany(() => Review, (review) => review.user)
  publishedReviews: Review[];

  /**
   * Reviews received from other users after buy
   */
  // @PolymorphicChildren(() => Review, { eager: false })
  @OneToMany(() => Review, (review) => review.subject)
  receivedReviews: Review[];

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

  @OneToMany(() => History, (visit) => visit.user)
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

  @OneToOne(() => Store)
  store?: Store;

  @OneToMany(() => Address, (addres) => addres.user)
  addresses: Address[];
}
