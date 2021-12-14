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
  name: 'platforms',
})
export class Platform {
  @ApiProperty({
    description: 'Platform Id number',
    type: 'integer',
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    description: 'The date when the platform is created',
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
    description: 'The date when the platform is updated',
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
    description: 'The date when the platform has been soft deleted',
    default: null,
    type: 'date',
    format: 'date-time',
  })
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt?: Date;

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
    description: '3 digits ISO currency code (Example: ARS)',
    type: 'string',
  })
  @Column({
    name: 'currency_code',
    type: 'char',
    length: 3,
  })
  currencyCode: string;

  @ApiProperty({
    description: '5 digits ISO language code (Example: es_AR)',
    type: 'string',
  })
  @Column({
    name: 'lang_code',
    type: 'char',
    length: 5,
  })
  langCode: string;

  @ApiProperty({
    description: 'Up to 5 digits phone code (Example: ++549)',
    type: 'string',
  })
  @Column({
    name: 'phone_country_code',
    type: 'char',
    length: 5,
  })
  phoneCountryCode: string;
}
