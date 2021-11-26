import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BeforeUpdate } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity({ name: 'carts' })
export class Cart {
  /*@PrimaryColumn()*/
  @PrimaryGeneratedColumn({ unsigned: true, type: 'bigint' })
  @ApiProperty({ type: [Number] })
  id: number;

  /*@Column('timestamp with time zone', { name: 'created_at', nullable: false, default: () => '((CURRENT_TIMESTAMP))' })  */
  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({ type: [Date] })
  created_at: Date;

  /*@Column('timestamp with time zone', { name: 'updated_at', nullable: false, default: () => 'CURRENT_TIMESTAMP' })  */
  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({ type: [Date] })
  updated_at: Date;

    @BeforeUpdate()
    updateTimeStamp(){
        this.updated_at = new Date;
    }

    @ManyToOne(type => User, user => user.id) user: User; 
    @Column({name: 'user_id', type: "bigint"})
    @ApiProperty({ type: [Number] })
    userId: number;

    @Column({type:"double precision"})
    @ApiProperty({ type: [Number] })
    amount: number;

    @Column("varchar", { length: 3 , name: 'currency_code'})
    @ApiProperty({ type: [String] })
    currencyCode: string;

}
