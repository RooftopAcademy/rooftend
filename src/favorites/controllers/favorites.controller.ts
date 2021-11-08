import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { FavoritesService } from '../services/favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  getAll() {
    return this.favoritesService.getAll();
  }

  @Get()
  @HttpCode(200)
  getById(@Param('id') id: number) {
    return this.favoritesService.getById(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: any) {
    return this.favoritesService.create(body);
  }

  @Put(':id')
  @HttpCode(204)
  update(@Param('id') id: number, @Body() body: any) {
    return this.favoritesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: number) {
    return this.favoritesService.delete(id);
  }
}
