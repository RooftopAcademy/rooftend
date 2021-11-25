import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'photos' })
export class PhotosEntity implements PolymorphicChildInterface {
  @ApiProperty({ example: 1, type: Number, description: 'PK' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '2003-01-01 2:00:00',
    type: Date,
    format: 'date-time',
    description: 'Creation date',
  })
  @Column({
    type: 'timestamp with time zone',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: Date;

  @ApiProperty({
    example: 'galery/items/yellow_one.jpg',
    type: String,
    description: 'Route to the photo',
  })
  @Column({ type: 'varchar', length: 200, nullable: false })
  url: string;

  @ApiProperty({ example: 150, type: Number, description: "photo's width" })
  @Column({ type: 'smallint', nullable: false })
  width: number;

  @ApiProperty({ example: 150, type: Number, description: "photo's height" })
  @Column({ type: 'smallint', nullable: false })
  height: number;

  @ApiProperty({ example: 150, type: Number, description: "photo's size" })
  @Column({ type: 'smallint', nullable: false })
  size: number;

  @PolymorphicParent(() => [User]) // Also items could be a parent
  subject: User;

  @ApiProperty({
    example: 12,
    type: Number,
    description: 'associated entity id',
  })
  @Column({ type: 'integer', name: 'subject_id', nullable: false })
  entityId: number;

  @ApiProperty({
    example: 'user',
    type: String,
    description: 'associated entity name',
  })
  @Column({
    type: 'varchar',
    length: 100,
    name: 'subject_type',
    nullable: false,
  })
  entityType: string;

  @ApiProperty({
    example: 'galery/items/yellow_one.jpg',
    type: String,
    description: 'url to redirect the user',
  })
  @Column({
    type: 'varchar',
    length: 200,
    name: 'redirect_url',
    nullable: true,
  })
  redirectUrl: string;
}
