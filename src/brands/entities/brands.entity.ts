import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
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

  @Column()
  @ApiProperty({
    example: 1234,
    description: 'The logo of the brand',
    type: Number,
  })
  @OneToOne(() => PhotosEntity)
  @JoinColumn({ name: 'photo_id' })
  photoId: PhotosEntity;
}
