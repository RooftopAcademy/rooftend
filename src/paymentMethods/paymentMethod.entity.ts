/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({
    name: 'payment_methods'
})
export default class PaymentMethod {
    @PrimaryGeneratedColumn({
        unsigned: true,
        type: 'bigint'
    })
    id: number;

    @Column({
        name: 'name',
        type: 'character varying',
        length: 15,
        nullable: false
    })
    name: string;

    @Column({
        name: 'type',
        type: 'character varying',
        length: 15,
        nullable: false
    })
    type: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false
    })
    created_at : Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false
    })
    updated_at : Date;

}
