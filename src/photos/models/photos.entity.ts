import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'photos' })
export class PhotosEntity implements PolymorphicChildInterface {
  @ApiProperty({
    name: 'id',
    type: Number,
    description: "Photo's ID",
    readOnly: true
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '2021-11-27T17:03:41.356Z',
    type: Date,
    format: 'date-time',
    description: 'Creation date',
    default: 'Current date',
  })
  @Column({
    type: 'timestamp with time zone',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({
    example: 'https://localhost:3000/galery/items/yellow_one.jpg',
    type: String,
    description: 'Route to the photo',
    nullable: false,
    maxLength: 200,
  })
  @Column({
    name: 'url',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  url: string;

  @ApiProperty({
    example: 150,
    type: Number,
    description: "Photo's width",
    nullable: false
  })
  @Column({
    name: 'width',
    type: 'smallint',
    nullable: false
  })
  width: number;

  @ApiProperty({
    example: 150,
    type: Number,
    description: "Photo's height",
    nullable: false,
  })
  @Column({
    name: 'height',
    type: 'smallint',
    nullable: false
  })
  height: number;

  @ApiProperty({
    example: 150,
    type: Number,
    description: "Photo's size",
    nullable: false,
  })
  @Column({
    name: 'size',
    type: 'smallint',
    nullable: false,
  })
  size: number;

  @Column({ type: 'integer', name: 'subject_id', nullable: false })
  entityId: number;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'subject_type',
    nullable: false,
  })
  entityType: string;

  @ApiProperty({
    example: 'https://localhost:3000/galery/items/yellow_one.jpg',
    type: String,
    description: 'Url to redirect the user',
  })
  @Column({
    type: 'varchar',
    length: 200,
    name: 'redirect_url',
    nullable: true,
  })
  redirectUrl: string;
}
