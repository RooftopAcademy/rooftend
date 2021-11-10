import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/categories.entity';


@Injectable()
export class CategoriesService {
  public constructor(
    @InjectRepository(Category) private repository : Repository<Category>
  ){}

  getAll() {
    return this.repository.find()
  }
  findOneById(id:number) {
    return {
      id: 'id',
      name: 'name',
    };
  }

//   let category = categories.find(c => c.id=id)
//         if (category)  return category
//         // return this.categoriesService.findOneById(id);
//         return res.status(404).end();
  create(body: Body) {
    return true;
  }
  async update(id:number, body:Body) {
    return true;
  }

  delete(id:number) {}
}
