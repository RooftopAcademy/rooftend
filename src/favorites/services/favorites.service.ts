import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { Favorite } from '../entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepo: Repository<Favorite>
  ) {}

  async paginate({ page, limit }: IPaginationOptions, token: number) {
    let countFavorites = await this.favoritesRepo.query(`
      SELECT
        COUNT(*)
      FROM
        favorite
    `);

    const totalFavorites = Number(countFavorites[0].count);
    const totalPages = Math.ceil(totalFavorites / Number(limit));
    const previousPagePath = (Number(page) > 0) ? `/favorites?page=${Number(page)}` : ""

    let favorites = await this.favoritesRepo.query(`
      SELECT
        favorite.id,
        items.title,
        items.description,
        items.price,
        items.stock,
        url
      FROM
        photos, items
      LEFT JOIN
        favorite
      ON
        favorite.item_id = items.id
      WHERE
        favorite.user_id = ${token}
      AND
        photos.subject_type = 'item'
      AND
        photos.subject_id = items.id
      LIMIT
        ${Number(limit)}
      OFFSET
        ${(Number(page) - 1) * Number(limit)}
    `);

    favorites = favorites.map(({
        id,
        url,
        title,
        description,
        price,
        stock
    }) => {
      return({
        "id": id,
        "item": {
          "photos": url,
          "title": title,
          "description": description,
          "price": price,
          "stock": stock,
        }
      })
    });

    const response = ({
      "items": [
        ...favorites
      ],
      "meta": {
        "totalItems": totalFavorites,
        "itemCount": favorites.length,
        "itemsPerPage": limit,
        "totalPages": totalPages,
        "currentPage": Number(page)
      },
      "links": {
        "first": `/favorites`,
        "previous": previousPagePath,
        "next": `/favorites?page=${Number(page) + 1}`,
        "last": `/favorites?page=${totalPages}`
      }
    });

    return response;
  }

  async create(createFavoriteDto: CreateFavoriteDto, token: number): Promise<void> {
    const preFavorite = { ...createFavoriteDto, "user_id": token };
    const newFavorite = this.favoritesRepo.create(preFavorite);
    await this.favoritesRepo.save(newFavorite);
    return;
  }

  async delete( id: number ): Promise<void> {
    await this.favoritesRepo.delete(id);
    return;
  }
}
