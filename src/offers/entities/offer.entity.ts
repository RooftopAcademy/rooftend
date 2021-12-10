import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
  } from "typeorm";

import { Item } from "../../items/entities/items.entity";
import { IPostgresInterval } from 'postgres-interval';

export enum PromotionType {
  LIGHTENING_DEAL = 'LIGHTENING_DEAL',
  DEAL_OF_THE_DAY = 'DEAL_OF_THE_DAY',
}

@Entity('offers')
export class Offer {
  @ApiProperty({
    type: Number,
    description: 'Offer Id',
    example: 5486
  })
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    })
    id: number;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'Created date',
    example: '2021-10-19 10:23:54+03'
  })
  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

  @ApiProperty({
    type: Number,
    description: 'The id of the offer item',
    example: 987,
  })
  @ManyToOne(() => Item)
  @JoinColumn({
    name: 'item_id',
    })
    item: Item;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'Offer start date',
    example: '2021-10-19 10:23:54+03',
  })
  @Column({
    name: 'start_at',
    type: 'timestamptz',
    nullable: false,
    })
    startAt: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'Offer end date',
    example: '2021-10-19 10:23:54+03',
  })
  @Column({
    name: 'end_at',
    type: 'timestamptz',
    nullable: false,
    })
    endAt: Date;

  @ApiProperty({
    type: Number,
    description: 'Discount rate',
    example: 25,
  })
  @Column({
    type: 'smallint',
    nullable: false,
    })
    discount: number;

  @Column({
    name: 'initial_stock',
    type: 'bigint',
    nullable: false
  })
  initialStock: number;

  @Column({
    name: 'sold_stock',
    type: 'bigint',
    nullable: false
  })
  soldStock: number;

  @Column({
    name: 'offer_expiration_time',
    type: 'time',
  })
  offerExpirationTime: Date ;


  @ApiProperty({
    type: Number,
    description: 'Price with discount',
    example: 159000.00,
  })
  @Column({
    name: 'final_price',
    type: 'float',
    nullable: false,
  })
  finalPrice: number;

  @ApiProperty({
    type: PromotionType,
    description: 'Promotion type: DEAL_OF_THE_DAY or LIGHTENING_DEAL',
    example: 'DEAL_OF_THE_DAY',
  })
  @Column({
    name: 'promotion_type',
    type: 'enum',
    enum: PromotionType,
    nullable: false,
    default: PromotionType.DEAL_OF_THE_DAY,
  })
  promotionType: PromotionType;
}
