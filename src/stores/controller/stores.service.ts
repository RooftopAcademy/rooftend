import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { StoresInterface } from '../models/stores.interface';
import { StoresEntity } from '../models/stores.entity';
import { DeleteResult } from 'typeorm/browser';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoresEntity)
    private readonly storesRepository: Repository<StoresEntity>,
  ) {}

  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<StoresEntity>> {
    return paginate<StoresEntity>(this.storesRepository, options);
  }

  getOne(id: string | number): Promise<StoresEntity> {
    return this.storesRepository.findOne(id);
  }

  create(store: StoresInterface): Promise<StoresInterface> {
    return this.storesRepository.save(store);
  }

  async update(
    id: number,
    store: StoresInterface,
  ): Promise<UpdateResult> {
    return this.storesRepository.update(id, store);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.storesRepository.delete(id);
  }
}
