import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Patch,
  ParseIntPipe,
  DefaultValuePipe,
  Query,
  Res,
} from '@nestjs/common';

import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { Response } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FavoritesService } from '../services/favorites.service';

import { Favorite } from '../entities/favorite.entity';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get a result page with 10 records' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Current page number. Default value: 1.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'List with maximum 10 favorites records.',
    schema: {
      example: {
        "items": [
          {
            "id": "1",
            "user_id": "41",
            "item_id": "123",
            "updatedAt": "2021-11-30T22:38:03.313Z"
          },
          {
            "id": "2",
            "user_id": "1",
            "item_id": "1",
            "updatedAt": "2021-11-30T22:38:28.517Z"
          },
        ],
        "meta": {
          "totalItems": 6,
          "itemCount": 2,
          "itemsPerPage": 10,
          "currentPage": 10,
        },
        "links": {
          "first": "/favorites?limit=10",
          "previous": "",
          "next": "",
          "last": "/favorites?page=1&limit=10"
        }
      },
    }
  })
  public async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Favorite>> {
    limit = limit > 10 ? 10 : limit;
    return this.favoritesService.paginate({
      page,
      limit,
      route: '/favorites',
    });
  }

  @Get(':id')
  @HttpCode(403)
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  public async getById(@Res() res: Response) {
    return res.status(403).end('Forbiden.');
  }

  @Post()
  @HttpCode(201)
  @ApiBody({
    type: CreateFavoriteDto,
  })
  @ApiOkResponse({
    description: 'The ',
    schema: {
      example: {
        "id": "16",
        "item_id": 1111,
        "updatedAt": "2021-12-01T03:32:12.128Z"
      },
    }
  })
  @ApiOperation({ summary: 'Create Favorite' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.'})
  public create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Patch(':id')
  @HttpCode(403)
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  public update(@Res() res: Response) {
    return res.status(403).end('Forbiden.');
  }

  @Delete(':id')
  @ApiQuery({
    name: 'id',
    type: Number,
    required: true,
    description: 'The ID of the record to delete',
    example: 1,
  })
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete Favorite' })
  @ApiResponse({ status: 200, description: 'OK.' })
  public delete(@Param('id') id: number | string) {
    return this.favoritesService.delete(id);
  }
}
