import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'photos' })
export class PhotosEntity implements PolymorphicChildInterface {
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

  @PolymorphicParent(() => [User]) // Items also could be a parent
  subject: User;

  @Column({ type: 'integer', name: 'subject_id', nullable: false })
  entityId: number;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'subject_type',
    nullable: false,
  })
  entityType: string;

  @Column({
    type: 'varchar',
    length: 200,
    name: 'redirect_url',
    nullable: true,
  })
  redirectUrl: string;
}
