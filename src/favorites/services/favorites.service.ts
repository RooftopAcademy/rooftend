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
import { User } from '../../users/entities/user.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepo: Repository<Favorite>,
  ) {}

  async paginate(
    options: IPaginationOptions,
    user: User,
  ): Promise<Pagination<Favorite>> {
    return paginate<Favorite>(this.favoritesRepo, options, { where: { user: { id: user.id } }, relations: ['item'] });
  }

  async create(
    createFavoriteDto: CreateFavoriteDto,
    user: User,
  ): Promise<void> {
    const preFavorite: any = { ...createFavoriteDto, user: user };
    
    const newFavorite = this.favoritesRepo.create(preFavorite);

    await this.favoritesRepo.save(newFavorite);
  }

  async delete(id: number): Promise<void> {
    await this.favoritesRepo.softDelete(id);
  }

  async findFavorite(id: number): Promise<Favorite> {
    const favorite = await this.favoritesRepo.findOne(id, {
      select: ['id'], 
      relations: ['user', 'item'],
    });

    return favorite;
  }
}
