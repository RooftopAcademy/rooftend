import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'brands'})
export class Brand {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  @ApiProperty({example: 1, description: 'The id of the brand', type: BigInt})
  id: number;

  @Column()
  @ApiProperty({example: 'nike', description: 'The name of the brand', type: String})
  name: string;

  @Column()
  @ApiProperty({example: '', description: 'The logo of the brand', type: String})
  photoId: string; 
}