import { Injectable,NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../categories.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CategoriesService {
  public constructor(
    @InjectRepository(Category) private repository : Repository<Category>
  ){}
  
  async paginate(options: IPaginationOptions): Promise<Pagination<Category>> {
    return paginate<Category>(this.repository, options);
  }

  async getAll(): Promise<Category[]> {
    return this.repository.find()
  }
  async findOne(id:number):Promise<Category> {
    const category: Category | undefined = await this.repository.findOne(id);
    if (!category) {
      throw new NotFoundException(`Review with id ${id} not found.`);
    }
    return category;
  }
  
  create(body: any): Promise<Category> {
    const newCategory = this.repository.create({id: body.id,name: body.name});
    return this.repository.save(newCategory)
  }

   async update(id:number, body:any): Promise<Category>{
    const category = await this.repository.findOne(id);
    this.repository.merge(category, body);
    return this.repository.save(category);
  }

  async delete(id:number) : Promise<boolean> {
    await this.repository.delete(id);
    return true;
  }
}
