import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorite } from '../entities/favorite.entity';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { ResCreateFavoriteDto } from '../dto/res-create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepo: Repository<Favorite>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Favorite>> {
    return paginate<Favorite>(this.favoritesRepo, options);
  }

  create(createFavoriteDto: CreateFavoriteDto): Promise<ResCreateFavoriteDto> {
    const newFavorite = this.favoritesRepo.create(createFavoriteDto);
    const res = this.favoritesRepo.save(newFavorite);
    let response: ResCreateFavoriteDto
    return res.then(i => 
      response = {
        "id": i.id,
        "item_id": i.item_id,
        "updatedAt": i.updatedAt
      }
    )
  }

  async delete(id: number | string): Promise<void> {
    await this.favoritesRepo.delete(id);
    return;
  }
}
