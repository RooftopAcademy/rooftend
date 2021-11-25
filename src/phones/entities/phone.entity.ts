import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'phones' })
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', { length: 4 })
  country_code: string;

  @Column('character varying', { length: 6 })
  area_code: string;

  @Column('character varying', { length: 10 })
  phone_number: string;

  user_id: number;
}
