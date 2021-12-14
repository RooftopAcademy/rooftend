import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'platforms',
})
export class Platform {
  @ApiProperty({
    description: 'Platform Id number',
    type: 'integer',
    example: 1,
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
    example: Date.now(),
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
    example: Date.now(),
  })
  @UpdateDateColumn({
    name: 'removed_at',
    type: 'timestamptz',
    default: () => null,
  })
  removedAt: Date;

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
    description: '3 digits ISO currency code',
    type: 'string',
    example: 'ARG',
  })
  @Column({
    name: 'currency_code',
    type: 'char',
    length: 3,
  })
  currencyCode: string;

  @ApiProperty({
    description: '5 digits ISO language code',
    type: 'string',
    example: 'es_AR',
  })
  @Column({
    name: 'lang_code',
    type: 'char',
    length: 5,
  })
  langCode: string;

  @ApiProperty({
    description: 'Up to 5 digits phone code',
    type: 'string',
    example: '++549',
  })
  @Column({
    name: 'phone_country_code',
    type: 'char',
    length: 5,
  })
  phoneCountryCode: string;
}
