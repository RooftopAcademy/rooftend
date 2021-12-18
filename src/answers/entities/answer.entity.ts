import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
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

    @OneToOne(() => User)
    @JoinColumn()
    @ApiProperty({
        type: Number,
        description: 'Id of user that answer',
        nullable: false,
        readOnly: true,
        example: 2,
    })
    user_id: number;


    @ApiProperty({
        type: Date,
        default: 'now()',
        example: '2021-11-18T01:46:52.589Z',
        description: 'The timestamp of the created answer',
    })
    @Column({ name: 'created_at', type: 'timestamp with time zone' })
    @Type(() => Date)
    createdAt: Date;
}