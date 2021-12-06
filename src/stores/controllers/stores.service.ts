import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Store } from '../models/stores.entity';
import { DeleteResult } from 'typeorm/browser';
import {
  IPaginationOptions,
  paginateRaw,
} from 'nestjs-typeorm-paginate';
import { ReadStoreDto } from '../models/read-store.dto';
import { CreateStoreDto } from '../models/create-store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}

  async paginate(options: IPaginationOptions) {
    return paginateRaw<Store>(
      this.storesRepository.createQueryBuilder('store')
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
    return await this.storesRepository.createQueryBuilder('store')
      .leftJoinAndSelect('store.brand', 'brand')
      .select([
        'brand.name AS "brand"',
      ]).where('store.id = :id', { id })
      .getRawOne()
  }

  async create(createStoreDto: CreateStoreDto): Promise<CreateStoreDto> {
    return this.storesRepository.save(createStoreDto).then((res) => {
      return {
        userId: res.userId,
        brandId: res.brandId,
      }
    });
  }

  async update(id: number, createStoreDto: CreateStoreDto): Promise<UpdateResult> {
    return this.storesRepository.update(id, createStoreDto);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.storesRepository.delete(id);
  }
}
