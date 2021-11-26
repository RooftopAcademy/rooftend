
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty({
    type:Number,
    description: 'The id of the category',
    example: 1,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'smallint',
  })
  id: number;
  
  @ApiProperty({
    type:String,
    maxLength:100,
    description: 'The name of the category',
    example: 'technology',
  })
  @Column({
    type: 'character varying',
    length: 100,
  })
  name: string;

  @ManyToOne(()=>Category,(category)=>category.id)
  @ApiProperty({
    type:Number,
    description: 'Category_id is related to category',
    example: 'technology',
  })
  @Column({
    name: 'category_id',
  })
  category_id: string;

  @OneToMany(()=>Category,(category)=>category.id)
  categories:Category[]
}
