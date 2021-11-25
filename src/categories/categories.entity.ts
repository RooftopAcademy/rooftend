
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

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

  @ManyToOne(()=>Category,(category)=>category.id )
  @JoinColumn({
    name :'category_id'
  })
  category_id : string

  @OneToMany(()=>Category,(category)=>category.id)
  categories:Category[]

}