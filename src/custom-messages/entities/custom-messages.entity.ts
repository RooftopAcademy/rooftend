import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('custom_messages')
export class CustomMessage {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  @ApiProperty({ example: 1, description: 'Message ID' })
  id: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({
    name: 'user_id',
  })
  @ApiProperty({ type: () => User, description: 'Message owner' })
  user: User;

  @Column({
    type: 'character varying',
    length: 100,
  })
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
    description: 'Message subject',
  })
  subject: string;

  @Column({
    type: 'character varying',
    length: 1000,
  })
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu',
    description: 'Message content',
  })
  message: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2016-03-26 10:10:10-05:00',
    description: "Message's creation date",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2016-03-26 10:10:10-05:00',
    description: "Message's last update date",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  @ApiProperty({
    example: '2016-03-26 10:10:10-05:00',
    description: "Message's delete date",
  })
  deletedAt?: Date;
}
