import { User } from "src/users/entities/user.entity";
// import { Item } from "src/items/entities/item.entity";

import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { ApiProperty } from '@nestjs/swagger';

@Entity('history')
export class History {

    @ApiProperty({ example: 1, description: 'The id of the History' })
    @PrimaryGeneratedColumn({
        type:'bigint',
        unsigned: true,
    })
    id: number;


    // @OneToOne(() => User)
    @ApiProperty({ example: 1, description: 'The user that has the history' })
    @Column({
        name:'user_id',
    })
    user_id: number;


    // @OneToOne(() => Item)
    @ApiProperty({ example: 1, description: 'The item that the user visited' })
    @Column({
        name:'item_id',
    })
    item_id: number;


    @ApiProperty({ example: '2021-11-22 13:58:27.207', description: 'The date-time that was created' })
    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
        })
    createdAt: Date;
}