import { ApiProperty } from '@nestjs/swagger';
import { AccountStatusEntity } from 'src/account-status/models/account-status.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, JoinTable } from 'typeorm';

@Entity('users')
export class User {

  @ApiProperty({
    description: 'User id number',
    type: Number,
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
  @Column({ type: 'character varying', length: 50, nullable: false })
  username: string;

  @ApiProperty({
    description: 'Password of user ',
    type: String,
  })
  @Column({ type: 'character varying', length: 100, nullable: false  })
  password: string;


  @ApiProperty({
    description: 'Email valid of user ',
    type: String,
  })
  @Column({ type: 'character varying', length: 100, nullable: false })
  email: string;

  // @ApiProperty({
  //   description: 'account status valid of user ',
  //    type: String,
  // })
  // @Column({ type: 'integer', nullable: false})
  // account_status: number;


  @ApiProperty({
    description: 'Account status assigned to that user ',
    type: Number,
  })
  @Column({ type: 'integer', nullable: false})
  @OneToOne(() => AccountStatusEntity, status => status.name)
  @JoinTable()
  account_status: AccountStatusEntity;

}
