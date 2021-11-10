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

  getAll(): Promise<Favorite[]> {
    return this.favoritesRepo.find();
  }

  getById(id: number): Promise<Favorite> {
    return this.favoritesRepo.findOne(id);
  }

  create(body: any): Promise<Favorite[]> {
    const newFavorite = this.favoritesRepo.create(body);
    return this.favoritesRepo.save(newFavorite);
  }

  async update(id: number, body: any): Promise<Favorite> {
    const favorite = await this.favoritesRepo.findOne(id);
    this.favoritesRepo.merge(favorite, body);
    return this.favoritesRepo.save(favorite);
  }

  async delete(id: number): Promise<void> {
    await this.favoritesRepo.delete(id);
    return;
  }
}
