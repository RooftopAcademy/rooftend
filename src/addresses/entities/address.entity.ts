import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'addresses',
})
export class Address {
  @ApiProperty({
    description: 'Address Id number',
    type: 'integer',
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
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The date when the platform has been soft removed',
    default: null,
    type: 'date',
    format: 'date-time',
  })
  @UpdateDateColumn({
    name: 'removed_at',
    type: 'timestamptz',
    default: null,
  })
  revomedAt: Date;

  @ApiProperty({
    description: '3 digits ISO country code (Example: ARG)',
    type: 'string',
  })
  @Column({
    name: 'country_code',
    type: 'char',
    length: 3,
  })
  countryCode: string;

  @ApiProperty({
    description: 'Country state name (Example: Córdoba)',
    type: 'string',
  })
  @Column({
    name: 'country_state',
    type: 'char',
    length: 100,
  })
  countryState: string;

  @ApiProperty({
    description: 'City name (Example: San Francisco)',
    type: 'string',
  })
  @Column({
    name: 'city_name',
    type: 'char',
    length: 200,
  })
  cityName: string;

  @ApiProperty({
    description: 'Street name (Example: 9 de Julio)',
    type: 'string',
  })
  @Column({
    name: 'street_name',
    type: 'char',
    length: 200,
  })
  streetName: string;

  @ApiProperty({
    description: 'Street number (Example: 3850)',
    type: 'integer',
  })
  @Column({
    name: 'street_number',
    type: 'integer',
  })
  streetNumber: number;

  @ApiProperty({
    description: 'Zip code (Example: X2400AIQ)',
    type: 'string',
  })
  @Column({
    name: 'zip_code',
    type: 'char',
    length: 10,
  })
  zipCode: string;

  @ApiProperty({
    description: 'Floor number (Example: 8)',
    type: 'small-integer',
    default: null,
  })
  @Column({
    name: 'floor',
    type: 'smallint',
    default: () => null,
  })
  floor: number;

  @ApiProperty({
    description: 'Office code (Example: B)',
    type: 'string',
    default: null,
  })
  @Column({
    name: 'floor',
    type: 'char',
    length: 5,
    default: () => null,
  })
  office: string;

  @ApiProperty({
    description:
      'References (Example: Indications about the house, apartment, neighborhood, streets, etc.)',
    type: 'string',
    default: null,
  })
  @Column({
    name: 'references',
    type: 'char',
    length: 500,
    default: () => null,
  })
  references: string;

  @ApiProperty({
    description: 'Subject_Id (Example: 4)',
    type: 'big-integer',
  })
  @Column({
    name: 'subject_id',
    type: 'bigint',
  })
  subjectId: number;

  @ApiProperty({
    description: 'Subject type (Example: User )',
    type: 'string',
  })
  @Column({
    name: 'subject_type',
    type: 'char',
    length: 100,
  })
  subjectType: string;
}
