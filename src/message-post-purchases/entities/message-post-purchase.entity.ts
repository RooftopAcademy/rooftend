import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cart } from '../../cart/entities/cart.entity';
import { User } from '../../users/entities/user.entity';

@Entity('messages_post_purchase')
export class MessagePostPurchase {
    @ApiProperty({
        description: 'Message id number',
        type: Number,
    })
    @PrimaryGeneratedColumn({
        unsigned: true,
        type: 'bigint',
    })
    id: number;

    @ApiProperty({
        description: 'Cart id',
        type: Number,
    })
    @Column({ type: 'bigint', nullable: false })
    @ManyToOne(() => Cart)
    @JoinColumn({
        name: 'cart_id',
    })
    cart_id: number;

    @ApiProperty({ example: 999, description: 'Id of the message owner', type: Number })
    @Column({ type: 'bigint', nullable: false })
    @ManyToOne(() => User)
    @JoinColumn({
        name: 'id',
    })
    sender_id: number;


    @ApiProperty({
        description: 'Message description',
        type: String,
    })
    @Column({ type: 'character varying', nullable: false })
    message: String;


    @ApiProperty({
        type: String,
        format: 'date-time',
        description: 'Created date of message',
        example: '2021-10-19 10:23:54+03'
    })
    @Column({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @ApiProperty({
        type: String,
        format: 'date-time',
        description: 'Send date of message',
        example: '2021-10-19 10:23:54+03'
    })
    @Column({
        name: 'sent_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    sentAt: Date;

    @ApiProperty({
        type: String,
        format: 'date-time',
        description: 'Send date of message',
        example: '2021-10-19 10:23:54+03'
    })
    @Column({
        name: 'received_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    receivedAt: Date;

    @ApiProperty({
        type: String,
        format: 'date-time',
        description: 'Send date of message',
        example: '2021-10-19 10:23:54+03'
    })
    @Column({
        name: 'read_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    readAt: Date;

}