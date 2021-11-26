<<<<<<< HEAD
import { PhotosEntity } from '../../photos/models/photos.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne, JoinTable } from 'typeorm';
import { Review } from '../../review/review.entity';
import { PolymorphicChildren } from 'typeorm-polymorphic';
import { ApiProperty } from '@nestjs/swagger';
import { AccountStatusEntity } from '../../account-status/models/account-status.entity';
=======
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { PolymorphicChildren } from 'typeorm-polymorphic';
import { ApiProperty } from '@nestjs/swagger';
import { AccountStatusEntity } from '../../account-status/models/account-status.entity';
import { PhotosEntity } from '../../photos/models/photos.entity';
import { Review } from '../../review/review.entity';
>>>>>>> bbb407f8efef3984e93a845355b607a40b2b527e

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

  // @ApiProperty({
  //   description: 'account status valid of user ',
  //    type: String,
  // })
  // @Column({ type: 'integer', nullable: false})
  // account_status: number;

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

<<<<<<< HEAD
  questions : []

  favorites : []
=======
  entities: [];

  favorites: [];
>>>>>>> bbb407f8efef3984e93a845355b607a40b2b527e
}
