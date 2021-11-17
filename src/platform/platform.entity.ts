import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'platforms',
})
export class Platform {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    name: 'country_code',
    type: 'char',
    length: 3,
  })
  countryCode: string;

  @Column({
    name: 'currency_code',
    type: 'char',
    length: 3,
  })
  currencyCode: string;

  @Column({
    name: 'lang_code',
    type: 'char',
    length: 5,
  })
  langCode: string;

  @Column({
    name: 'phone_country_code',
    type: 'char',
    length: 5,
  })
  phoneCountryCode: string;
}
