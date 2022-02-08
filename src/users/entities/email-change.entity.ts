import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity('email_change')
export class EmailChange {
  // @ApiProperty({
  //   description: 'Email change id number',
  //   type: Number,
  // })
  // @PrimaryGeneratedColumn({
  //   unsigned: true,
  //   type: 'bigint',
  // })
  // id: number;

  // @ApiProperty({
  //   description: 'Authorization uuid',
  //   type: String,
  // })
  @PrimaryGeneratedColumn('uuid', {
    name: 'authorization_id',
  })
  authorizationId: string;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @Column({
    name: 'old_email',
    type: 'character varying',
    length: 100,
  })
  oldEmail: string;

  @Column({
    name: 'new_email',
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  newEmail: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;
}
