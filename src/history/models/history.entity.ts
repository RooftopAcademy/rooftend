import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class History {
    @PrimaryGeneratedColumn({
        type:'bigint',
        unsigned: true,
    })
    id: number;


    @Column({
        name:'user_id',
        type:'bigint',
        unsigned:true,
    })
    user_id: number;


    @Column({
        name:'item_id',
        type: 'bigint',
        unsigned: true,
    })
    item_id: number;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
        })
    createdAt: Date;
}