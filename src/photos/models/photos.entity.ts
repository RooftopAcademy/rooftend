import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'photos' })
export class PhotosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp with time zone',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: Date;

  @Column({ type: 'varchar', length: 200, nullable: false })
  url: string;

  @Column({ type: 'smallint', nullable: false })
  width: number;

  @Column({ type: 'smallint', nullable: false })
  height: number;

  @Column({ type: 'smallint', nullable: false })
  size: number;

  @Column({ type: 'integer', name: 'subject_id', nullable: false })
  subjectId: number;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'subject_type',
    nullable: false,
  })
  subjectType: string;

  @Column({
    type: 'varchar',
    length: 200,
    name: 'redirect_url',
    nullable: true,
  })
  redirectUrl: string;
}
