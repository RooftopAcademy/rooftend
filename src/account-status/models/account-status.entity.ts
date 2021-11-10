import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('account_statuses')
export class AccountStatusEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        type: 'smallint',
    })
    id: number;

    @Column({
        name: 'character varying',
        length: 10,
    })
    name: string;
}