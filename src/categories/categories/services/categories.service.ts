
import {Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/categories.entity';


@Injectable()
export class CategoriesService {
  public constructor(
    @InjectRepository(Category) private repository : Repository<Category>
  ){}
  
  getAll() : Promise<Category[]>{
    return this.repository.find()
  }

  findOne(id:number) : Promise<Category> {
    return this.repository.findOne(id);
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
