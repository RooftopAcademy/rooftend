import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { User } from "src/users/entities/user.entity";
// import { Item } from "src/items/entities/item.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity('history')
export class History {

    @ApiProperty({ example: 1, description: 'The id of the History' })
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
    @ApiProperty({ example: 1, description: 'The user that has the history' })
    @Column({
        name:'user_id',
    })
    user_id: number;

    @Column({
      name:'item_id',
      type: 'bigint',
      unsigned: true,
    })
    @ApiProperty({ example: 1, description: 'The item that the user visited' })
    item_id: number;

    @ApiProperty({ default: 'Current date', type: Date, description: 'The date-time that was created' })
    @Column({
      name: 'created_at',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;
}