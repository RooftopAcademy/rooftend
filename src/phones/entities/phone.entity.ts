import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'phones' })
export class Phone {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  @ApiProperty({
    type: Number,
    description: 'Phone Id',
    readOnly: true,
    example: 1,
  })
  id: number;

  @Column({
    name: 'country_code',
    type: 'character varying',
    length: 4,
    nullable: false,
  })
  @ApiProperty({
    example: '+54',
    description: 'Country code',
    type: 'string',
    maxLength: 4,
  })
  country_code: string;

  @Column({
    name: 'area_code',
    type: 'character varying',
    length: 6,
    nullable: false,
  })
  @ApiProperty({
    example: '2202',
    description: 'Area code',
    type: 'string',
    maxLength: 4,
    nullable: false,
  })
  area_code: string;

  @Column({
    name: 'phone_number',
    type: 'character varying',
    length: 6,
    nullable: false,
  })
  @ApiProperty({
    example: '1234678',
    description: 'Phone number',
    type: 'string',
    maxLength: 4,
    nullable: false,
  })
  phone_number: string;

  @ManyToOne(() => User, (user) => user.id)
  @Column({
    type: 'bigint',
    nullable: false,
    name: 'user_id'
  })
  @ApiProperty({
    example: '1234678',
    description: 'User id',
    type: 'bigint',
    nullable: false,
  })
  user_id: number;
}
