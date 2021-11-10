import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  ParseIntPipe,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FavoritesService } from '../services/favorites.service';

import { Favorite } from '../entities/favorite.entity';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Favorite>> {
    limit = limit > 100 ? 100 : limit;
    return this.favoritesService.paginate({
      page,
      limit,
      route: `${process.env.DB_HOST.substring(
        0,
        process.env.DB_HOST.length - 1,
      )}:${Number(process.env.DB_PORT)}/favorites`,
    });
  }

  @Get()
  @HttpCode(200)
  getAll() {
    return this.favoritesService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: number | string) {
    return this.favoritesService.getById(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: any) {
    return this.favoritesService.create(body);
  }

  @Put(':id')
  @HttpCode(204)
  update(@Param('id') id: number | string, @Body() body: any) {
    return this.favoritesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: number | string) {
    return this.favoritesService.delete(id);
  }
}
