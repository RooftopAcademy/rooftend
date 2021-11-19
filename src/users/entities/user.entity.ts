import { PhotosEntity } from 'src/photos/models/photos.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
}
