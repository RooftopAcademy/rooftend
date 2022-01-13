import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('shipping_methods')
export class ShippingMethod {
  @ApiProperty({
    type: 'integer',
    description: 'Shipping method Id',
    example: 13,
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
  })
  @Column({
    name: 'name',
    type: 'character varying',
    length: 200,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: 'integer',
    description: 'URL of the company logo',
    example: 'https://images.net/logos/84646',
  })
  @Column({
    name: 'logo_url',
    type: 'character varying',
    length: 500,
    nullable: true,
  })
  logoURL: string;
}
