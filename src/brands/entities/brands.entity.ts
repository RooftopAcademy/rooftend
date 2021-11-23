import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column()
  name: string;

  @Column()
  photoId: string;
}