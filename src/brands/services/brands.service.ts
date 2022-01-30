import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brands.entity';
import { createBrandDTO } from '../entities/create-brands-dto.entity';

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
    const brand = await this.brandRepo.findOne(id);

    if (!brand) {
      throw new HttpException('BRAND_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return brand;
  }

  async exists(name: string): Promise<boolean> {
    const brand = await this.brandRepo.findOne({ name });

    if (brand) {
      return true;
    }

    return false;
  }

  async create(body: createBrandDTO): Promise<void> {
    if (await this.exists(body.name)) {
      throw new HttpException('BRAND_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }

    const newBrand = this.brandRepo.create(body);
    await this.brandRepo.save(newBrand);
  }

  async update(id: number, body: createBrandDTO): Promise<void> {
    if (await this.exists(body.name)) {
      throw new HttpException('BRAND_NAME_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }

    await this.brandRepo.update(id, body);
  }

  async delete(id: number): Promise<void> {
    await this.brandRepo.softDelete(id);
  }
}
