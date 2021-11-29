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

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FavoritesService } from '../services/favorites.service';

import { Favorite } from '../entities/favorite.entity';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get a result page with 10 records' })
  @ApiResponse({ status: 200, description: 'OK.' })
  public async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Favorite>> {
    limit = limit > 100 ? 100 : limit;
    return this.favoritesService.paginate({
      page,
      limit,
      route: '/favorites',
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get the record according to the id entered' })
  @ApiResponse({ status: 200, description: 'OK.', type: Favorite })
  public async getById(@Param('id') id: number | string, @Res() res: Response) {
    const response = await this.favoritesService.getById(id);
    if (response) return res.status(200).send(response).end();
    return res.status(404).end('Not Found');
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Favorite' })
  @ApiResponse({ status: 201, description: 'Created.' })
  public create(@Body() body: any) {
    return this.favoritesService.create(body);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Update Favorite' })
  @ApiResponse({ status: 204, description: 'Resource updated successfully.' })
  public update(@Param('id') id: number | string, @Body() body: any) {
    return this.favoritesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete Favorite' })
  @ApiResponse({ status: 200, description: 'OK.' })
  public delete(@Param('id') id: number | string) {
    return this.favoritesService.delete(id);
  }
}
