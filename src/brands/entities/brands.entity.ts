import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';

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