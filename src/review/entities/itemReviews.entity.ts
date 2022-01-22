import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Item } from "../../items/entities/items.entity";
import { Reviews } from "./reviews";


@Entity('item_reviews')
export class ItemReviews extends Reviews {
    @ApiProperty({
        type: Number,
        minimum: 1,
        maximum: 5,
        description: 'Integer representing the score the user gave to the reviewed entity.',
        nullable: false,
    })
    @Column({
        nullable: false,
        name: 'score',
        type: 'smallint',
    })
    score: number;

    @ApiProperty({
        type: Number,
        description: 'likes in items publications reviews',
        minimum: 0,
    })
    @Column({
        name: 'like',
        type: 'bigint',
        default: 0,
    })
    likes_count: number;

    @ApiProperty({
        type: Number,
        description: 'likes in items publications reviews',
        nullable: true,
        minimum: 0,
    })
    @Column({
        nullable: false,
        name: 'dislikes',
        type: 'bigint',
        default: 0,
    })
    dislike_count: number;

    @ManyToOne(() => Item, (item) => item.reviews)
    @JoinColumn({ name: 'item_id' })
    @ApiProperty({
        type: Item,
        description: 'Id of the item that has been reviewed',
        nullable: false,
        readOnly: true,
        example: 2,
    })
    item: Item;
}