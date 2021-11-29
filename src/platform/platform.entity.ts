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
    type: Number,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    description: 'The date when the platform is created',
    default: 'Current date',
    type: Date,
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
    type: Date,
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({
    description: '3 digits ISO country code (Example: ARG)',
    type: String,
  })
  @Column({
    name: 'country_code',
    type: 'char',
    length: 3,
  })
  countryCode: string;

  @ApiProperty({
    description: '3 digits ISO currency code (Example: ARS)',
    type: String,
  })
  @Column({
    name: 'currency_code',
    type: 'char',
    length: 3,
  })
  currencyCode: string;

  @ApiProperty({
    description: '5 digits ISO language code (Example: es_AR)',
    type: String,
  })
  @Column({
    name: 'lang_code',
    type: 'char',
    length: 5,
  })
  langCode: string;

  @ApiProperty({
    description: 'Up to 5 digits phone code (Example: ++549)',
    type: String,
  })
  @Column({
    name: 'phone_country_code',
    type: 'char',
    length: 5,
  })
  phoneCountryCode: string;
}
