import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({
  name: 'addresses',
})
export class Address {
  @ApiProperty({
    description: 'Address Id number',
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    description: 'The date when the address is created',
    default: 'Current date',
    type: String,
    format: 'date-time',
    example: '2021-12-15',
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the address is updated',
    default: 'Current date',
    type: String,
    format: 'date-time',
    example: '2021-12-15',
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: null,
  })
  updatedAt: Date;

  @ApiProperty({
    description: '3 digits ISO country code',
    type: String,
    example: 'ARG',
  })
  @Column({
    name: 'country_code',
    type: 'character varying',
    length: 3,
  })
  countryCode: string;

  @ApiProperty({
    description: 'Country state name',
    type: String,
    example: 'Córdoba',
  })
  @Column({
    name: 'country_state',
    type: 'character varying',
    length: 100,
  })
  countryState: string;

  @ApiProperty({
    description: 'City name',
    type: String,
    example: 'San Francisco',
  })
  @Column({
    name: 'city_name',
    type: 'character varying',
    length: 200,
  })
  cityName: string;

  @ApiProperty({
    description: 'Street name',
    type: String,
    example: '9 de Julio',
  })
  @Column({
    name: 'street_name',
    type: 'character varying',
    length: 200,
  })
  streetName: string;

  @ApiProperty({
    description: 'Street number',
    type: Number,
    example: 3850,
  })
  @Column({
    name: 'street_number',
    type: 'integer',
  })
  streetNumber: number;

  @ApiProperty({
    description: 'Zip code',
    type: String,
    example: 'X2400AIQ',
  })
  @Column({
    name: 'zip_code',
    type: 'character varying',
    length: 10,
  })
  zipCode: string;

  @ApiProperty({
    description: 'Floor number',
    type: Number,
    example: 8,
    default: null,
  })
  @Column({
    name: 'floor',
    type: 'smallint',
    default: null,
  })
  floor?: number;

  @ApiProperty({
    description: 'Office code',
    type: String,
    example: 'B',
    default: null,
  })
  @Column({
    name: 'office',
    type: 'character varying',
    length: 5,
    default: null,
  })
  office?: string;

  @ApiProperty({
    description:
      'Indications about the house, apartment, neighborhood, streets, etc.',
    type: String,
    example: 'My house color is beige, with a black door.',
    default: null,
  })
  @Column({
    name: 'references',
    type: 'character varying',
    length: 500,
    default: null,
  })
  references?: string;

  @ApiProperty({ example: 999, description: 'Id of the Adress owner', type: Number })
  @Column({ type: 'bigint', nullable: false })
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  subjectId: number;

  @ApiProperty({
    description: 'Entity type this address belongs',
    example: 'User',
    type: String,
  })
  @Column({
    name: 'subject_type',
    type: 'character varying',
    length: 100,
  })
  subjectType: string;
}
