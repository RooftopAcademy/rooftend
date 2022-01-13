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
    example: 'Technology',
  })
  @Column({
    type: 'character varying',
    length: 100,
  })
  name: string;

  @ManyToOne(() => Category, (category) => category.subCategories)
  @ApiProperty({
    type: () => Category,
    description: 'Parent category id',
    example: '1',
  })
  @JoinColumn({
    name: 'category_id',
  })
  parentCategory: Category;

  @OneToMany(() => Category, (category) => category.parentCategory)
  subCategories: Category[];
}
