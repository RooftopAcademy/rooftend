import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity({
    name : 'profiles'
})
export class Profile {
    @PrimaryGeneratedColumn({
        unsigned: true,
        type : 'bigint'
    })
    id : number
<<<<<<< HEAD
    
=======

>>>>>>> 7691872 (Add profile module)
    @Column({
        name : 'first_name',
        type : 'character varying',
        length : 100
    })
    firstName : string

    @Column({
        name : 'last_name',
        type : 'character varying',
        length : 100
    })
    lastName : string

    @Column({
        name : 'identification_type',
        type : 'character varying',
        length : 5
    })
    identificationType : string
<<<<<<< HEAD
    
=======

>>>>>>> 7691872 (Add profile module)
    @Column({
        name : 'identification_number',
        type : 'character varying',
        length : 10
    })
    identificationNumber : string

    @Column({
        name : 'user_id'
    })
    userId : number
}
