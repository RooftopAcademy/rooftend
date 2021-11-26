import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_statuses')
export class AccountStatusEntity {
  @ApiProperty({
    description: 'Id of the status',
    type: Number,
    example: 2,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'smallint',
  })
  id: number;

  @ApiProperty({
    description: 'Name of the account status',
    type: String,
    example: 'BOCKED',
    maxLength: 10,
  })
  @Column({
    name: 'character varying',
    length: 10,
  })
  name: string;
}
