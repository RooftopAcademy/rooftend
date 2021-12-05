import {Entity, Column,PrimaryGeneratedColumn,CreateDateColumn} from 'typeorm';


@Entity ('logins')
export class Login {
    @PrimaryGeneratedColumn({
        unsigned: true,
        type: 'bigint',
    })
    id: number;

    @Column({
        type: 'cidr',
      })
    ip: string;

    @CreateDateColumn({
        name: 'created_at',
        nullable: false,
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
      })
    // @ApiProperty({ type: [Date] })
    created_at: Date;

    @Column({
        type: 'character varying',
        length: 30,
      })
    device: string;

    @Column({
        type: 'character varying',
        length: 30,
    })
    platform: string;

    @Column({
        type: 'json',
        })
    geolocation: string;

    @Column({
        name: 'user_id',
      })
    user_id: string;
}