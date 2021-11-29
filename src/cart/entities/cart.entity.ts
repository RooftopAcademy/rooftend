import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BeforeUpdate, JoinColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity({ name: 'carts' })
export class Cart {
  
  @PrimaryGeneratedColumn({ unsigned: true, type: 'bigint' })
  @ApiProperty({ 
    name: "id",
    type: "integer" ,
    readOnly:true
  })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({ 
    name: "created_at",
    type: "string" ,
    format: "date-time"
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({ 
    name: "updated_at",
    type: "string" ,
    format: "date-time"
  })
  updated_at: Date;

  @BeforeUpdate()
  updateTimeStamp(){
      this.updated_at = new Date;
  }

  @ManyToOne(type => User, user => user.id) user: User; 
  @Column({name: 'user_id', type: "bigint"})
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column({type:"double precision"})
  @ApiProperty({ 
    name: "amount",
    type: "integer",
    required: true,
    example: "666",
    description: "Item amount in this cart"
  })
  amount: number;

  @Column("varchar", { length: 3 , name: 'currency_code'})
  @ApiProperty({
    name: "currency_code",
    required: true, 
    type: "string",
    example: "ab6",
    description: "Currency code of the user location",
    maxLength: 3
  })
  currencyCode: string;

}
