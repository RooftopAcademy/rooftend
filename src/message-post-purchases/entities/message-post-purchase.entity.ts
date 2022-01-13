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
    cart_id: Cart;

    @ApiProperty({ example: 999, description: 'Id of the message owner', type: Number })
    @Column({ type: 'bigint', nullable: false })
    @ManyToOne(() => User)
    @JoinColumn({
        name: 'sender_id',
    })
    sender_id: User;

    @ApiProperty({ example: 999, description: 'Id of the message received User', type: Number })
    @Column({ type: 'bigint', nullable: false })
    @ManyToOne(() => User)
    @JoinColumn({
        name: 'receiver_id',
    })
    receiver_id: User;

    @ApiProperty({
        description: 'Message description',
        type: String,
    })
    @Column({ type: 'character varying', nullable: false })
    message: String;

    /**
     * Represents when user sent message
     */
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

    /**
     * Represent when user was received
     */
    @ApiProperty({
        type: String,
        format: 'date-time',
        description: 'Send date of message',
        example: '2021-10-19 10:23:54+03'
    })
    @Column({
        name: 'received_at',
        type: 'timestamptz',
        default:  null,
    })
    receivedAt: Date;

    /**
     * Represent when user read the message
     */
    @ApiProperty({
        type: String,
        format: 'date-time',
        description: 'When user read the message',
        example: '2021-10-19 10:23:54+03'
    })
    @Column({
        name: 'read_at',
        type: 'timestamptz',
        default: null,
    })
    readAt: Date;

}