import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  getAll(): Promise<StoresInterface[]> {
    return this.storesRepository.find();
  }

  getOne(id: number): Promise<StoresInterface> {
    return this.storesRepository.findOne(id);
  }

  create(store: StoresInterface): Promise<StoresInterface> {
    return this.storesRepository.save(store);
  }

  async update(
    id: number,
    newStore: StoresInterface,
  ): Promise<StoresInterface> {
    const store = await this.storesRepository.findOne(id);
    this.storesRepository.merge(store, newStore);
    return this.storesRepository.save(store);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.storesRepository.delete(id);
  }
}
