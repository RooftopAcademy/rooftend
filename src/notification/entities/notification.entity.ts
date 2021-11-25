import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity'

@Entity({
    name: 'notification',
})
export class Notification {
    @PrimaryGeneratedColumn({
        unsigned: true,
        type: 'bigint',
    })
    id: number;

    @ApiProperty({ example: 1, description: 'Id to the related user' })
    @Column({
        name: 'user_id',
        unsigned: true,
        type: 'bigint',
    })
    @OneToOne(type => User, user => user.id)
    user_id: number

    @ApiProperty({ 
       example: 'http://localhost:3000/notifications',
       description: 'link to where it redirects when clicked'
    })
    @Column({
        name: 'action_url',
        type: 'character varying',
        length: 100
    })
    action_url: string

    @ApiProperty({
         example: 'shipping notification',
         description: 'your purchase is on the way'
    })
    @Column({
        name: 'title',
        type: 'character varying',
        length: 20
    })
    title: string

    @ApiProperty({
        example: 'description',
        description: 'description'
    })
    @Column({
        name: 'description',
        type: 'character varying',
        length: 120
    })
    description: string

    @ApiProperty({
        example: 'image.jpg',
        description: 'path where the notification image is stored'
    })
    @Column({
        name: 'image_url',
        type: 'character varying',
        length: 100
    })
    image_url: string

    @ApiProperty({
        example: '22/11/2021',
        description: 'date the notification was created'
    })
    @Column({
        name: 'created_at',
    })
    created_at: Date

    @ApiProperty({
        example: '22/11/2021',
        description: 'date the notification was sent to the user'
   })
    @Column({
        name: 'sent_at'
    })
    sent_at: Date

    @ApiProperty({
        example: '23/11/2021',
        description: 'date the user read the notification'
    })
    @Column({
        name: 'read_at'
    })
    read_at: Date

    @ApiProperty({
        example: '23/11/2021',
        description: 'date the user deleted the notification'
    })
    @Column({
        name: 'deleted_at'
    })
    deleted_at: Date
}