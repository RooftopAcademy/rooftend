import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'user_id', type: 'bigint', nullable: false })
  userId: number;

  @Column({ name: 'comment', type: 'varchar', length: 500, nullable: false })
  comment: string;

  @Column({ name: 'score', type: 'smallint', nullable: false })
  score: number;

  @Column({
    name: 'created_at',
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;
}
