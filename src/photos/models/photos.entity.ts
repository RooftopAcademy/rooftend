import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'photos' })
export class PhotosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp with time zone',
  })
  created_at: Date;

  @Column({ type: 'varchar', length: 200 })
  url: string;

  @Column({ type: 'smallint' })
  width: number;

  @Column({ type: 'smallint' })
  height: number;

  @Column({ type: 'smallint' })
  size: number;

  @Column({ type: 'integer' })
  subject_id: number;

  @Column({ type: 'varchar', length: 100 })
  subject_type: string;

  @Column({ type: 'varchar', length: 200 })
  redirect_url: string;
}
