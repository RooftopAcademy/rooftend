import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/stores.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}

  async paginate(options: IPaginationOptions) {
    return paginate<Store>(this.storesRepository, options, {
      select: ['id', 'brand'],
      relations: ['brand'],
    });
  }

  async getOne(id: string | number): Promise<Store> {
    const store: Store = await this.storesRepository.findOne(id, {
      select: ['id', 'brand'],
      where: {
        id: id,
      },
      relations: ['brand'],
    });
    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }
    return store;
  }
}
