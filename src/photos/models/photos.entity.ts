import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'photos' })
export class PhotosEntity implements PolymorphicChildInterface {
  @ApiProperty({
    name: 'id',
    type: Number,
    description: "Photo's ID",
    readOnly: true
  })
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @ApiProperty({
    example: '2021-11-27T17:03:41.356Z',
    type: Date,
    format: 'date-time',
    description: 'Creation date',
    default: 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'created_at',
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
    type: 'character varying',
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

  @ApiProperty({
    example: 2,
    type: Number,
    description: "Entity Id that has the photo",
    nullable: false,
  })
  @Column({
    type: 'bigint',
    name: 'subject_id',
    nullable: false
  })
  entityId: number;


  @ApiProperty({
    example: 'item',
    type: String,
    description: "Type of the entity that has the photo",
    nullable: false,
    maxLength: 100,
  })
  @Column({
    type: 'character varying',
    length: 100,
    name: 'subject_type',
    nullable: false,
  })
  entityType: string;

  @ApiProperty({
    example: 'https://localhost:3000/gallery/items/yellow_one.jpg',
    type: String,
    description: 'Url to redirect the user',
    nullable: false,
    maxLength: 200,
  })
  @Column({
    type: 'character varying',
    length: 200,
    name: 'redirect_url',
    nullable: false,
  })
  redirectUrl: string;
}
