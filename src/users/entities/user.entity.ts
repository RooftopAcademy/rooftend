import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { PolymorphicChildren } from 'typeorm-polymorphic';
import { ApiProperty } from '@nestjs/swagger';
import { AccountStatusEntity } from '../../account-status/models/account-status.entity';
import { PhotosEntity } from '../../photos/models/photos.entity';
import { Review } from '../../review/review.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { Search } from '../../search/search.entity';
import { QuestionsModule } from '../../questions/questions.module';
import { userInfo } from 'os';
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
  @OneToOne(() => AccountStatusEntity, (status) => status.name)
  @JoinTable()
  account_status: AccountStatusEntity;

  @Column({ default: false })
  completed: boolean;

  @PolymorphicChildren(() => PhotosEntity, {
    eager: false,
  })
  photos: PhotosEntity[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @PolymorphicChildren(() => Review, { eager: false })
  receivedReviews: Review[];

  entities: [];

  favorites: [];

  @OneToMany(() => Item, (item) => item.userId)
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
