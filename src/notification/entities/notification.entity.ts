import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity({
  name: 'notification',
})
export class Notification {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Id to the related user.' })
  @ManyToOne(() => User)
  @ApiHideProperty()
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({
    example: 'http://localhost:3000/notifications',
    description: 'Link to where it redirects when clicked.',
  })
  @Column({
    name: 'action_url',
    type: 'character varying',
    length: 100,
  })
  action_url: string;

  @ApiProperty({
    example: 'Your purchase is on the way.',
    description: 'Shipping notification.',
  })
  @Column({
    name: 'title',
    type: 'character varying',
    length: 20,
  })
  title: string;

  @ApiProperty({
    example: 'Description.',
    description: 'Description.',
  })
  @Column({
    name: 'description',
    type: 'character varying',
    length: 120,
  })
  description: string;

  @ApiProperty({
    example: 'image.jpg',
    description: 'Path where the notification image is stored.',
  })
  @Column({
    name: 'image_url',
    type: 'character varying',
    length: 100,
  })
  image_url: string;

  @ApiProperty({
    example: '22/11/2021',
    description: 'Date the notification was created.',
  })
  @Column({
    name: 'created_at',
  })
  created_at: Date;

  @ApiProperty({
    example: '22/11/2021',
    description: 'Date the notification was sent to the user.',
  })
  @Column({
    name: 'sent_at',
  })
  sent_at: Date;

  @ApiProperty({
    example: '23/11/2021',
    description: 'Date the user read the notification.',
  })
  @Column({
    name: 'read_at',
  })
  read_at: Date;

  @ApiProperty({
    example: '23/11/2021',
    description: 'Date the user deleted the notification.',
  })
  @Column({
    name: 'deleted_at',
  })
  deleted_at: Date;
}
