import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Category } from '../entities/categories.entity';
@Injectable()
export class CategoriesService {
  public constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Category>> {
    return paginate<Category>(this.repository, options, {
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
}
