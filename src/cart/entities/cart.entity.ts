import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity(/*{name: "carts"}*/)
export class Cart{
    /*@PrimaryColumn()*/
    @PrimaryGeneratedColumn()
    id : number;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column()
    userId: number;

    @Column()
    ammount: number;

    @Column("varchar", { length: 3 })
    currencyCode: string;
}