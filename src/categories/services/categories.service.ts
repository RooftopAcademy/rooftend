import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Category } from '../entities/categories.entity';
import { isNull } from 'util';

@Injectable()
export class CategoriesService {
  public constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Category>> {
    return paginate<Category>(this.repository, options,{
      where: {
        parentCategory: { id: IsNull() },
      },
      relations: ['subCategories'],
    });
  }

  async findOne(id: number): Promise<Category> {
    const category: Category = await this.repository.findOne(id, {
      relations: ['subCategories'],
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    return category;
  }
  create(body: any): Promise<Category> {
    const newCategory = this.repository.create({
      id: body.id,
      name: body.name,
    });
    return this.repository.save(newCategory);
  }

  async update(id: number, body: any): Promise<Category> {
    const category = await this.repository.findOne(id);
    this.repository.merge(category, body);
    return this.repository.save(category);
  }

  async delete(id: number): Promise<boolean> {
    await this.repository.delete(id);
    return true;
  }
}
