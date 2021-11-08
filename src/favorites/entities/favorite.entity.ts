import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item_id: number;

  @Column()
  user_id: number;
}
