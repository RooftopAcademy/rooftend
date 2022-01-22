import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

export abstract class Reviews {

    @ApiProperty({
        type: Number,
        description: 'The id of the review.',
        readOnly: true,
        example: 1,
    })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User, (user) => user.publishedReviews, { eager: true })
    @ApiProperty({
        type: () => User,
        description: 'The user who creates the review.',
    })
    user: User;

    @ApiProperty({
        description: 'The timestamp of the creation of the review.',
        default: 'CURRENT_TIMESTAMP',
        type: Date,
        format: 'date-time',
        example: '2021-11-18T01:46:52.589Z',
        nullable: false,
    })
    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        nullable: false,
    })
    createdAt: Date;

    @ApiProperty({
        type: String,
        maxLength: 500,
        description: 'The body of the review.',
        example: 'Muy buena atención al cliente.',
        nullable: false,
    })
    @Column({
        name: 'comment',
        type: 'character varying',
        length: 500,
    })
    comment: string;
}