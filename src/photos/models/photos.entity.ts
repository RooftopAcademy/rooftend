import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../../items/entities/items.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'photos' })
export class Photos {
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
    example: 1,
    description: 'Items related to photos.',
  })
  @ManyToOne((type) => Item, (item) => item.id)
  @JoinColumn({ 
    name: 'item_id',
  })
  item: Item;

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

  @ManyToOne(() => User, (user) => user.visits)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    example: 1,
    description: 'The user that has the photos',
    type: () => User,
  })
  user: User;
}
