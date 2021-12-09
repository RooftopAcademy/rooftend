import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "../../items/entities/items.entity";

export enum PromotionType {
    LIGHTENING_DEAL = 'LIGHTENING_DEAL',
    DEAL_OF_THE_DAY = 'DEAL_OF_THE_DAY',
}

@Entity('offers')
export class Offer {
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
    @Column({
        name: 'item_id',
        type: 'bigint',
        nullable: false,
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
        name: 'final_price',
        type: 'float',
        nullable: false,
    })
    finalPrice: number;

    @Column({
        name: 'promotion_type',
        type: 'enum',
        enum: PromotionType,
        nullable: false,
        default: PromotionType.DEAL_OF_THE_DAY,
    })
    promotionType: PromotionType;
}
