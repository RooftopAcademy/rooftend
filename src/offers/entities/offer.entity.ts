import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "../../items/entities/items.entity";
import { IPostgresInterval } from 'postgres-interval';

export enum PromotionType {
  LIGHTENING_DEAL = 'LIGHTENING_DEAL',
  DEAL_OF_THE_DAY = 'DEAL_OF_THE_DAY',
}

@Entity('offers')
export class Offer {
    @ApiProperty({

    })
    @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    })
    id: number;

    @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @ManyToOne(() => Item)
    @JoinColumn({
    name: 'item_id',
    })
    item: Item;

    @Column({
    name: 'start_at',
    type: 'timestamptz',
    nullable: false,
    })
    startAt: Date;

    @Column({
    name: 'end_at',
    type: 'timestamptz',
    nullable: false,
    })
    endAt: Date;

    @Column({
    type: 'smallint',
    nullable: false,
    })
    discount: number;

    @Column({
        name: 'promotion_type',
        type: 'enum',
        enum: PromotionType,
        nullable: false,
        default: PromotionType.DEAL_OF_THE_DAY,
    })
    promotionType: PromotionType;

    /*------lightning_deals-------*/

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

    @Column({
        name: 'final_price',
        type: 'float',
        nullable: false,
    })
    finalPrice: number;

}
