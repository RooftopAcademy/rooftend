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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FavoritesService } from '../services/favorites.service';

import { Favorite } from '../entities/favorite.entity';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  public async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Favorite>> {
    limit = limit > 100 ? 100 : limit;
    return this.favoritesService.paginate({
      page,
      limit,
      route: `localhost:3000/favorites`,
    });
  }

  @Get(':id')
  public async getById(@Param('id') id: number | string, @Res() res: Response) {
    const response = await this.favoritesService.getById(id);
    if (response) return res.status(200).send(response).end();
    return res.status(404).end('Not Found');
  }

  @Post()
  @HttpCode(201)
  public create(@Body() body: any) {
    return this.favoritesService.create(body);
  }

  @Put(':id')
  @HttpCode(204)
  public update(@Param('id') id: number | string, @Body() body: any) {
    return this.favoritesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  public delete(@Param('id') id: number | string) {
    return this.favoritesService.delete(id);
  }
}
