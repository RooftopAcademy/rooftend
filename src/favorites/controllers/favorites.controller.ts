import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { FavoritesService } from '../services/favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @Get()
  getById(@Param('id') id: number) {
    return this.favoritesService.getById(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.favoritesService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.favoritesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.favoritesService.delete(id);
  }
}
