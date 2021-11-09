import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('account_status')
export class AccountStatusEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}