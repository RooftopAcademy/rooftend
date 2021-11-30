import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorite } from '../entities/favorite.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepo: Repository<Favorite>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Favorite>> {
    return paginate<Favorite>(this.favoritesRepo, options);
  }

  create(body: any): Promise<Favorite[]> {
    const newFavorite = this.favoritesRepo.create(body);
    return this.favoritesRepo.save(newFavorite);
  }

  async delete(id: number | string): Promise<void> {
    await this.favoritesRepo.delete(id);
    return;
  }
}
