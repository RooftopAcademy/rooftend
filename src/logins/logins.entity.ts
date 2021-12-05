import {Entity, Column,PrimaryGeneratedColumn,CreateDateColumn, ManyToOne} from 'typeorm';
import { User } from '../users/entities/user.entity';


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

    @ManyToOne(()=>User)
    @Column({
        name: 'user_id',
      })
    user_id: string;
}