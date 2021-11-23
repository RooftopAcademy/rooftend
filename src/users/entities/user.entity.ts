import { ApiProperty } from '@nestjs/swagger';
import { AccountStatusEntity } from 'src/account-status/models/account-status.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {

  @ApiProperty({
    description: 'User id number',
    type: BigInt,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;


  @ApiProperty({
    description: 'Username',
    type: String,
  })
  @Column({ type: 'varchar', length: 30 })
  username: string;

  @ApiProperty({
    description: 'Password of user ',
    type: String,
  })
  @Column({ type: 'varchar', length: 30 })
  password: string;


  @ApiProperty({
    description: 'Email valid of user ',
    type: String,
  })
  @Column({ type: 'varchar', length: 50 })
  email: string;

  @ApiProperty({
    description: 'Account status assigned to that user ',
    type: String,
  })
  @OneToOne(() => AccountStatusEntity, accountStatus => accountStatus.name)
  @JoinColumn()
  account_status: AccountStatusEntity;

}
