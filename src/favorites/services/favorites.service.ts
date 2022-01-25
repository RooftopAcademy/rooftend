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
  ) {};

  async paginate(
    options: IPaginationOptions,
    user: User,
  ): Promise<Pagination<Favorite>> {
    return paginate<Favorite>(this.favoritesRepo, options, { where: { user: { id: user.id } } });
  };

  async create(
    createFavoriteDto: CreateFavoriteDto,
    token: number,
  ): Promise<void> {
    const preFavorite = { ...createFavoriteDto, user_id: token };
    const newFavorite = this.favoritesRepo.create(preFavorite);

    await this.favoritesRepo.save(newFavorite);
    
    return;
  };

  async delete(id: number): Promise<void> {
    await this.favoritesRepo.delete(id);

    //return
  };

  async findFavorite(userId: number): Promise<Favorite> {
    const favorite = await this.favoritesRepo.findOne({
      select: ['id'], where: { purchasedAt: null , user:{ id:userId }, relations: ['user'], order: { id: 'DESC' } },
    });

    return favorite;
  };
}
