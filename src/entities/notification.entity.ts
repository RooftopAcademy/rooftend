import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    user_id: Number

    @Column()
    action_url: String

    @Column()
    title: String

    @Column()
    description: String

    @Column()
    image_url: String

    @Column()
    created_at: Date

    @Column()
    sent_at: Date

    @Column()
    read_at: Date

    @Column()
    deleted_at: Date
}