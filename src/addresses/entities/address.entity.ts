import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({
  name: 'addresses',
})
export class Address {
  @ApiProperty({
    description: 'Address Id number',
    type: 'integer',
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
    type: 'date',
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
    type: 'date',
    format: 'date-time',
    example: '2021-12-15',
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt?: Date;

  @ApiProperty({
    description: '3 digits ISO country code',
    type: 'string',
    example: 'ARG',
  })
  @Column({
    name: 'country_code',
    type: 'char',
    length: 3,
  })
  countryCode: string;

  @ApiProperty({
    description: 'Country state name',
    type: 'string',
    example: 'Córdoba',
  })
  @Column({
    name: 'country_state',
    type: 'char',
    length: 100,
  })
  countryState: string;

  @ApiProperty({
    description: 'City name',
    type: 'string',
    example: 'San Francisco',
  })
  @Column({
    name: 'city_name',
    type: 'char',
    length: 200,
  })
  cityName: string;

  @ApiProperty({
    description: 'Street name',
    type: 'string',
    example: '9 de Julio',
  })
  @Column({
    name: 'street_name',
    type: 'char',
    length: 200,
  })
  streetName: string;

  @ApiProperty({
    description: 'Street number',
    type: 'integer',
    example: 3850,
  })
  @Column({
    name: 'street_number',
    type: 'integer',
  })
  streetNumber: number;

  @ApiProperty({
    description: 'Zip code',
    type: 'string',
    example: 'X2400AIQ',
  })
  @Column({
    name: 'zip_code',
    type: 'char',
    length: 10,
  })
  zipCode: string;

  @ApiProperty({
    description: 'Floor number',
    type: 'small-integer',
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
    type: 'string',
    example: 'B',
    default: null,
  })
  @Column({
    name: 'office',
    type: 'char',
    length: 5,
    default: null,
  })
  office?: string;

  @ApiProperty({
    description:
      'Indications about the house, apartment, neighborhood, streets, etc.',
    type: 'string',
    example: 'My house color is beige, with a black door.',
    default: null,
  })
  @Column({
    name: 'references',
    type: 'char',
    length: 500,
    default: null,
  })
  references?: string;

  @ApiProperty({
    description: 'Id of the entity this address belongs',
    example: 4,
    type: 'big-integer',
  })
  @Column({
    name: 'subject_id',
    type: 'bigint',
  })
  subjectId: number;

  @ApiProperty({
    description: 'Entity type this address belongs',
    example: 'User',
    type: 'string',
  })
  @Column({
    name: 'subject_type',
    type: 'char',
    length: 100,
  })
  subjectType: string;
}
