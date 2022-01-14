import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/stores.entity';
import { IPaginationOptions, paginateRaw } from 'nestjs-typeorm-paginate';
import { ReadStoreDto } from '../entities/read-store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}

  async paginate(options: IPaginationOptions) {
    return paginateRaw<Store>(
      this.storesRepository
        .createQueryBuilder('store')
        .leftJoinAndSelect('store.user', 'user')
        .leftJoinAndSelect('store.brand', 'brand')
        .select([
          'store.id::integer AS "id"',
          'user.username AS "username"',
          'brand.name AS "brand"',
        ]),
      options,
    );
  }

  async getOne(id: string | number): Promise<ReadStoreDto> {
    return await this.storesRepository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.brand', 'brand')
      .select(['brand.name AS "brand"'])
      .where('store.id = :id', { id })
      .getRawOne();
  }
}
