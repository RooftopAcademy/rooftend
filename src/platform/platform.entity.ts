<<<<<<< HEAD
=======
import { ApiProperty } from '@nestjs/swagger';
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
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
<<<<<<< HEAD
=======
  @ApiProperty({
    description: 'Platform Id number',
    type: BigInt,
  })
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

<<<<<<< HEAD
=======
  @ApiProperty({
    description: 'The date when the platform is created',
    default: 'Current date',
    type: Date,
  })
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

<<<<<<< HEAD
=======
  @ApiProperty({
    description: 'The date when the platform is updated',
    default: 'Current date',
    type: Date,
  })
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

<<<<<<< HEAD
=======
  @ApiProperty({
    description: '3 digits ISO country code (Example: ARG)',
    type: String,
  })
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
  @Column({
    name: 'country_code',
    type: 'char',
    length: 3,
  })
  countryCode: string;

<<<<<<< HEAD
=======
  @ApiProperty({
    description: '3 digits ISO currency code (Example: ARS)',
    type: String,
  })
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
  @Column({
    name: 'currency_code',
    type: 'char',
    length: 3,
  })
  currencyCode: string;

<<<<<<< HEAD
=======
  @ApiProperty({
    description: '5 digits ISO language code (Example: es_AR)',
    type: String,
  })
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
  @Column({
    name: 'lang_code',
    type: 'char',
    length: 5,
  })
  langCode: string;

<<<<<<< HEAD
=======
  @ApiProperty({
    description: 'Up to 5 digits phone code (Example: ++549)',
    type: String,
  })
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
  @Column({
    name: 'phone_country_code',
    type: 'char',
    length: 5,
  })
  phoneCountryCode: string;
}
