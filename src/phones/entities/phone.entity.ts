import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'phones' })
export class Phone {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { length: 4 })
  country_code: string;

  @Column('character varying', { length: 6 })
  area_code: string;

  @Column('character varying', { length: 10 })
  phone_number: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ type: 'bigint' })
  user_id: number;
}
