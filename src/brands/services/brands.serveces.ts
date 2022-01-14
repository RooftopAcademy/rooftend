import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brands.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>,
  ) {}
  async paginate(options: IPaginationOptions): Promise<Pagination<Brand>> {
    return paginate<Brand>(this.brandRepo, options);
  }
  async findOne(id: number): Promise<Brand> {
    const brand: Brand = await this.brandRepo.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found.`);
    }
    return brand;
  }
}
