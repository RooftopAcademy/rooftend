import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorite } from '../entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite) private favoritesRepo: Repository<Favorite>,
  ) {}
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

  async delete(id: number): Promise<boolean> {
    await this.favoritesRepo.delete(id);
    return true;
  }
}
