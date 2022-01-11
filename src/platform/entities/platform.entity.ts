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
    example: 1,
    readOnly: true,
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
    example: Date.now(),
    nullable: false,
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the platform is updated',
    default: 'Current date',
    type: 'date',
    format: 'date-time',
    example: Date.now(),
    nullable: false,
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The date when the platform has been soft deleted',
    default: null,
    type: 'date',
    format: 'date-time',
    example: '2021-12-16',
    nullable: true,
  })
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
    nullable: true,
  })
  deletedAt?: Date;
  @ApiProperty({
    description: '3 digits ISO country code (Example: ARG)',
    type: 'string',
    example: 'ARG',
    nullable: false,
    maxLength: 3,
  })
  @Column({
    name: 'country_code',
    type: 'char',
    length: 3,
    nullable: false,
  })
  countryCode: string;

  @ApiProperty({
    description: '3 digits ISO currency code',
    type: 'string',
    example: 'ARG',
    maxLength: 3,
    nullable: false,
  })
  @Column({
    name: 'currency_code',
    type: 'char',
    length: 3,
    nullable: false,
  })
  currencyCode: string;

  @ApiProperty({
    description: '5 digits ISO language code',
    type: 'string',
    example: 'es_AR',
    nullable: false,
    maxLength: 5,
  })
  @Column({
    name: 'lang_code',
    type: 'char',
    length: 5,
    nullable: false,
  })
  langCode: string;

  @ApiProperty({
    description: 'Up to 5 digits phone code',
    type: 'string',
    example: '++549',
    nullable: false,
    maxLength: 5,
  })
  @Column({
    name: 'phone_country_code',
    type: 'char',
    length: 5,
    nullable: false,
  })
  phoneCountryCode: string;
}
