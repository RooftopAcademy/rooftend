/* eslint-disable prettier/prettier */
import{Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Categories {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;
}