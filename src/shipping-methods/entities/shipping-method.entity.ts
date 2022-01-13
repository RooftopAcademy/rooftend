import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('shipping_methods')
export class ShippingMethod {
  @ApiProperty({
    type: Number,
    description: 'Shipping method Id',
    example: 13,
    readOnly: true,
  })
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    type: 'string',
    description: 'Name of the shipping method',
    example: 'Retiro en sucursal',
    maxLength: 200,
  })
  @Column({
    name: 'name',
    type: 'character varying',
    length: 200,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'URL of the company logo',
    example: 'https://images.net/logos/84646',
    maxLength: 500,
  })
  @Column({
    name: 'logo_url',
    type: 'character varying',
    length: 500,
    nullable: true,
  })
  logoURL: string;
}
