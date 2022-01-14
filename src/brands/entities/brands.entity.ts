import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Store } from '../../stores/entities/stores.entity';

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
    example: 'nike',
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
  @OneToOne(() => Store, (store) => store.brand)
  store?: Store;
}
