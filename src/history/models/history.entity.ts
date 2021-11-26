<<<<<<< HEAD
import { User } from "../../users/entities/user.entity";
// import { Item } from "../../items/entities/item.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
=======
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
>>>>>>> bbb407f8efef3984e93a845355b607a40b2b527e
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('history')
export class History {
  @ApiProperty({ example: 1, description: 'The id of the History' })
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @OneToOne(() => User)
  @Column({
    name: 'user_id',
    type: 'bigint',
    unsigned: true,
  })
  @ApiProperty({ example: 1, description: 'The user that has the history' })
  user_id: number;

<<<<<<< HEAD
    // @OneToOne(() => Item)
    // @Column({
    //   name:'item_id',
    //   type: 'bigint',
    //   unsigned: true,
    // })
    // @ApiProperty({ example: 1, description: 'The item that the user visited' })
    // item_id: number;
=======
  // @OneToOne(() => Item)
  // @Column({
  //   name:'item_id',
  //   type: 'bigint',
  //   unsigned: true,
  // })
  // @ApiProperty({ example: 1, description: 'The item that the user visited' })
  // item_id: number;
>>>>>>> bbb407f8efef3984e93a845355b607a40b2b527e


  @ApiProperty({
    default: 'Current date',
    type: Date,
    description: 'The date-time that was created',
  })
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
