import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";



@Entity('answers')
export class Answer {

    @ApiProperty({
        type: Number,
        description: 'Answer Id',
        readOnly: true,
        example: 1,
    })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @Type(() => Number)
    id: number;

    @ApiProperty({
        type: String,
        maxLength: 500,
        description: 'Answer content',
        example: 'Gracias por preguntar, aun contamos con stock!',
    })
    @Column({ name: 'content', type: 'varchar', length: 500 })
    content: string;

    @ApiProperty({
        type: Date,
        default: 'now()',
        example: '2021-11-18T01:46:52.589Z',
        format: 'date-time',
        description: 'The timestamp of the created answer',
    })
    @Column({ name: 'created_at', type: 'timestamp with time zone' })
    @Type(() => Date)
    createdAt: Date;

    @ApiProperty({
        description: 'Deleted timestamp',
        default: null,
        type: Date,
        format: 'date-time',
        example: '2021-12-19',
    })
    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        default: null,
    })
    deletedAt?: Date;
}