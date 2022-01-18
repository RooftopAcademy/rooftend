import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {

  @ApiProperty({
    type: Number,
    description: 'Profile id',
    readOnly: true,
    example: 1,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    type: String,
    maxLength: 100,
    description: 'First name',
    example: 'Armando',
    nullable: false,
  })
  @Column({
    name: 'first_name',
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  firstName: string;


  @ApiProperty({
    type: String,
    maxLength: 100,
    description: 'Last Name',
    example: 'Armando',
    nullable: false,
  })
  @Column({
    name: 'last_name',
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  lastName: string;

  @ApiProperty({
    type: String,
    maxLength: 5,
    description: 'Type of identification',
    example: 'Passport',
    nullable: false,
  })
  @Column({
    name: 'identification_type',
    type: 'character varying',
    length: 5,
    nullable: false,
  })
  identificationType: string;

  @ApiProperty({
    type: String,
    maxLength: 10,
    description: 'Type of identification',
    example: '31195855',
    nullable: false,
  })
  @Column({
    name: 'identification_number',
    type: 'character varying',
    length: 10,
    nullable: false,
  })
  identificationNumber: string;

  @Column({
    name: 'user_id',
  })
  userId: number;
}
