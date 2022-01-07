import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';

import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { Favorite } from '../entities/favorite.entity';
import { PhotosEntity } from '../../photos/models/photos.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepo: Repository<Favorite>,
  ) {}

  async paginate(
    options: IPaginationOptions,
    token: number,
  ): Promise<Pagination<Favorite>> {
    const favorites = this.favoritesRepo
      .createQueryBuilder('favorite')
      .where('favorite.user_id = :token', { token })
      .leftJoinAndMapOne('favorite.item', 'favorite.item_id', 'items')
      .leftJoinAndMapOne(
        'items.photos',
        PhotosEntity,
        'photos',
        'favorite.item_id = photos.subject_id and photos.subject_type = :item',
        { item: 'item' },
      )
      .select(['favorite.id'])
      .addSelect([
        'items.title',
        'items.description',
        'items.price',
        'items.stock',
        'photos.url',
      ]);

    return paginate<Favorite>(favorites, options);
  }

  async create(
    createFavoriteDto: CreateFavoriteDto,
    token: number,
  ): Promise<void> {
    const preFavorite = { ...createFavoriteDto, user_id: token };
    const newFavorite = this.favoritesRepo.create(preFavorite);
    await this.favoritesRepo.save(newFavorite);
    return;
  }

  async delete(id: number): Promise<void> {
    await this.favoritesRepo.delete(id);
    return;
  }
}
