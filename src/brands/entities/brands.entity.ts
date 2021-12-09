import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { PhotosEntity } from '../../photos/models/photos.entity';

@Entity({ name: 'brands' })
export class Brand {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @ApiProperty({ example: 1, description: 'The id of the brand', type: Number })
  id: number;

  @Column()
  @ApiProperty({
    example: 'nike',
    description: 'The name of the brand',
    type: String,
  })
  name: string;

  @OneToOne(()=> PhotosEntity, (photo)=> photo.id)
  @Column()
  @ApiProperty({
    example: 1234,
    description: 'The logo of the brand',
    type: Number,
  })
  photoId: Number;
}
