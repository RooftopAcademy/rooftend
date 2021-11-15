<<<<<<< HEAD
export default [
    {
        "id": 1,
        "firstName": "Marcos",
        "lastName": "Galperin",
        "avatarUrl" : "https://i.pravatar.cc/150?img=3",
        "identification" : {
            "type" : "DNI",
            "number" : "123456789"
        }
    },
    {
        "id": 2,
        "firstName": "Hernan",
        "lastName": "Kazah",
        "avatarUrl" : "https://i.pravatar.cc/150?img=3",
        "identification" : {
            "type" : "DNI",
            "number" : "123456789"
        }
    }
]
=======
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
>>>>>>> 7691872 (Add profile module)
