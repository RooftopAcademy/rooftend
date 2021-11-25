import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn({
    unsigned : true,
    type : 'smallint'
  })
  id: number
  
  @Column({
    type : 'character varying',
    length  : 100
  })
  name : string

  @Column({
      name :'category_id'
  })
  category_id : string

}