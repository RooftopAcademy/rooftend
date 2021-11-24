import { PhotosEntity } from 'src/photos/models/photos.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from 'src/review/review.entity';
import { PolymorphicChildren } from 'typeorm-polymorphic';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  account_status: number;

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
}
