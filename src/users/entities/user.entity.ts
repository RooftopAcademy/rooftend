import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinTable,
  DeleteDateColumn,
} from 'typeorm';
import { PolymorphicChildren } from 'typeorm-polymorphic';
import { ApiProperty } from '@nestjs/swagger';
import { AccountStatusEntity } from '../../account-status/models/account-status.entity';
import { PhotosEntity } from '../../photos/models/photos.entity';
import { Review } from '../../review/review.entity';
import { Search } from '../../search/search.entity';
import { Question } from '../../questions/entities/question.entity';
import { Item } from '../../items/entities/items.entity';
import { History } from '../../history/models/history.entity';
import { SupportRequest } from '../../support/entities/supportRequest.entity';
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
  @Column({ name: 'account_status', type: 'integer', nullable: true })
  @OneToOne(() => AccountStatusEntity, (status) => status.name)
  @JoinTable()
  accountStatus: AccountStatusEntity;

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

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @PolymorphicChildren(() => Review, { eager: false })
  receivedReviews: Review[];

  entities: [];

  favorites: [];

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];

  @OneToMany(() => Search, (search) => search.user)
  searches: Search[];

  @OneToMany(() => History, (visit) => visit.user_id)
  visits: History[];

  @OneToMany((type) => Question, (question) => question.userId)
  questions: Question[];

  /**
   * A user can make many support requests
   */
  @OneToMany(() => SupportRequest, (supportRequest) => supportRequest.user)
  supportRequests: SupportRequest[];
}
