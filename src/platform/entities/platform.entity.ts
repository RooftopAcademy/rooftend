import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Platform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  country_code: string;

  @Column()
  currency_code: string;

  @Column()
  lang_code: string;

  @Column()
  phone_country_code: string;
}
