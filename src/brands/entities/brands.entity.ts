import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'brands' })
export class Brand {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  @ApiProperty({
    example: 1,
    description: 'The id of the brand',
    type: Number,
    readOnly: true,
  })
  id: number;

  @Column({
    name: 'content',
    type: 'character varying',
    nullable: false,
    length: 30,
  })
  @ApiProperty({
    example: 'Nike',
    description: 'The name of the brand',
    type: String,
    nullable: false,
    maxLength: 30,
  })
  name: string;

  @Column({
    name: 'photo_url',
    type: 'character varying',
    nullable: false,
  })
  @ApiProperty({
    example:
      'https://logos-marcas.com/wp-content/uploads/2020/04/Nike-Logo.png',
    description: 'The logo of the brand',
    type: String,
    nullable: false,
  })
  photoUrl: string;

  @ApiProperty({
    description: 'The date when the brand is created',
    default: 'Current date',
    type: 'date',
    format: 'date-time',
    example: '2021-12-13T03:00:00.000Z',
    nullable: false,
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the brand is updated',
    default: 'Current date',
    type: 'date',
    format: 'date-time',
    example: '2021-12-13T03:00:00.000Z',
    nullable: false,
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
  })
  updatedAt: Date;

  @ApiHideProperty()
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
    nullable: true,
    select: false,
  })
  deletedAt: Date;
}
