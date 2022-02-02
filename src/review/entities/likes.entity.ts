import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ItemReviews } from "./itemReviews.entity";



@Entity('likes')
export class Likes {

    @ApiProperty({
        type: Number,
        description: 'The id of the review.',
        readOnly: true,
        example: 1,
    })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ApiProperty({
        type: Boolean,
        description: 'liked or dislike',
        example: true,
        nullable: true,
    })
    @Column({
        name: 'liked',
        type: 'boolean',
        default: null,
        nullable: true,
    })
    liked?: boolean;

    @ManyToOne(() => User, (user) => user.likes)
    @JoinColumn({ name: 'user' })
    @ApiProperty({
        type: User,
        description: 'User that liked a review',
        example: 2,
        nullable: false,
    })
    user: User;

    @ManyToOne(() => ItemReviews, (review) => review.likes)
    @JoinColumn({ name: 'item_review_id' })
    @ApiProperty({
        type: ItemReviews,
        description: 'liked or dislike',
        example: 1,
        nullable: false,
    })
    itemReview: ItemReviews;

}