import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'photos' })
export class PhotosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp with time zone',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ type: 'varchar', length: 200 })
  url: string;

  @Column({ type: 'smallint' })
  width: number;

  @Column({ type: 'smallint' })
  height: number;

  @Column({ type: 'smallint' })
  size: number;

  @Column({ type: 'integer', name: 'subject_id' })
  subjectId: number;

  @Column({ type: 'varchar', length: 100, name: 'subject_type' })
  subjectType: string;

  @Column({ type: 'varchar', length: 200, name: 'redirect_url' })
  redirectUrl: string;
}
