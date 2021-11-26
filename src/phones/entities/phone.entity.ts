import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'phones' })
export class Phone {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty({
    example: '1234',
    description: 'Id for Phone row',
    type: 'bigint',
  })
  id: number;

  @Column('character varying', { length: 4 })
  @ApiProperty({ example: '+54', description: 'Country code', type: 'string' })
  country_code: string;

  @Column('character varying', { length: 6 })
  @ApiProperty({ example: '2202', description: 'Area code', type: 'string' })
  area_code: string;

  @Column('character varying', { length: 10 })
  @ApiProperty({
    example: '1234678',
    description: 'Phone number',
    type: 'string',
  })
  phone_number: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
