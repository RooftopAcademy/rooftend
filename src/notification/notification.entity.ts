import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'notification',
})
export class Notification {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'user_id',
    unsigned: true,
    type: 'bigint',
  })
  user_id: number;

  @Column({
    name: 'action_url',
    type: 'character varying',
    length: 100,
  })
  action_url: string;

  @Column({
    name: 'title',
    type: 'character varying',
    length: 20,
  })
  title: string;

  @Column({
    name: 'description',
    type: 'character varying',
    length: 120,
  })
  description: string;

  @Column({
    name: 'image_url',
    type: 'character varying',
    length: 100,
  })
  image_url: string;

  @Column({
    name: 'created_at',
  })
  created_at: Date;

  @Column({
    name: 'sent_at',
  })
  sent_at: Date;

  @Column({
    name: 'read_at',
  })
  read_at: Date;

  @Column({
    name: 'deleted_at',
  })
  deleted_at: Date;
}
