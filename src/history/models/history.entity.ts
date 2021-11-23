import { User } from "src/users/entities/user.entity";
import { Item } from "src/items/entities/item.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class History {
    @PrimaryGeneratedColumn({
        type:'bigint',
        unsigned: true,
    })
    id: number;

    @OneToOne(() => User)
    @Column({
        name:'user_id',
    })
    user_id: number;


    @OneToOne(() => Item)
    @Column({
        name:'item_id',
    })
    item_id: number;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
        })
    createdAt: Date;
}