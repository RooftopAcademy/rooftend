import { ItemEntity } from "src/items/items.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class QuestionsEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        type: 'bigint'
    })
    id: number;

    @ManyToOne(type => ItemEntity, item => item.questions)
    item: ItemEntity;


    @ManyToOne(type => UserEntity, user => user.questions)
    user: UserEntity;

    @Column({
        name: 'question',
        type: 'character varying',
        nullable: false
    })
    questionContent: string;

    @Column({
        name: 'answer',
        type: 'character varying',
        nullable: true
    })
    answer: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at : Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updated_at : Date;
}
