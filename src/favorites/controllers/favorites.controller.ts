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
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';

import { FavoritesService } from '../services/favorites.service';

import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { Favorite } from '../entities/favorite.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get favorites.' })
  @ApiOkResponse({
    status: 200,
    description: 'List of favorites records. Maximum 10 records per page.',
    schema: {
      example: {
        "items": [
          {
            "id": 31,
            "item": {
              "photos": "https://images.unsplash.com/photo-1638486071991-860cc6b14338?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
              "title": "Lorem ipsum dolor sit amet, consectetuer adipiscin",
              "description": "More Lorem ipsum and dolorems",
              "price": 1050.99,
              "stock": 10
            }
          },
          {
            "id": 32,
            "item": {
              "photos": "https://images.unsplash.com/photo-1633114128729-0a8dc13406b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
              "title": "Otra publicacion",
              "description": "Otra descripcion",
              "price": 250.99,
              "stock": 10
            }
          },
          {
            "id": 35,
            "item": {
              "photos": "https://images.unsplash.com/photo-1633114128729-0a8dc13406b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
              "title": "Da Da Da - original Song",
              "description": "Da DA DA!",
              "price": 6450,
              "stock": 104
            }
          },
          {
            "id": 37,
            "item": {
              "photos": "https://images.unsplash.com/photo-1633114128729-0a8dc13406b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
              "title": "La Vaca Lola - original Song",
              "description": "No me acuerdo la letra",
              "price": 1320,
              "stock": 12
            }
          },
          {
            "id": 39,
            "item": {
              "photos": "https://images.unsplash.com/photo-1633114128729-0a8dc13406b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
              "title": "La computadora de Canale",
              "description": "Un poco usada, pero va.",
              "price": 100000,
              "stock": 181
            }
          },
          {
            "id": 41,
            "item": {
              "photos": "https://images.unsplash.com/photo-1633114128729-0a8dc13406b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
              "title": "Una galletita encontrada en el suelo",
              "description": "Tiene pelos",
              "price": 2,
              "stock": 1
            }
          },
          {
            "id": 33,
            "item": {
              "photos": "https://images.unsplash.com/photo-1638486071991-860cc6b14338?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
              "title": "Una publicacion",
              "description": "Una descripcion",
              "price": 2250.99,
              "stock": 104
            }
          },
          {
            "id": 36,
            "item": {
              "photos": "https://images.unsplash.com/photo-1638486071991-860cc6b14338?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
              "title": "La Cucaracha - original Song",
              "description": "Ya no puede caminar",
              "price": 130,
              "stock": 54
            }
          },
          {
            "id": 38,
            "item": {
              "photos": "https://images.unsplash.com/photo-1638486071991-860cc6b14338?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
              "title": "La peluca de Agust??n",
              "description": "Usada en la Demo Day.",
              "price": 1440,
              "stock": 11
            }
          },
          {
            "id": 40,
            "item": {
              "photos": "https://images.unsplash.com/photo-1638486071991-860cc6b14338?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
              "title": "La Moto de Canale",
              "description": "Pinchada la rueda, el asiento tiene olor feo pero sirve.",
              "price": 140000,
              "stock": 181
            }
          }
        ],
        "meta": {
          "totalItems": 39,
          "itemCount": 10,
          "itemsPerPage": 10,
          "totalPages": 2,
          "currentPage": 1
        },
        "links": {
          "first": "/favorites",
          "previous": "",
          "next": "/favorites?page=2",
          "last": "/favorites?page=4"
        }
      },
    }
  })
  @ApiQuery({
    name: 'token',
    type: Number,
    required: true,
    description: 'Token.',
    example: 1,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Current page number. Default value: 1.',
    example: 1,
  })
  public async paginate(
    @Query('token') token: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Favorite>> {
    limit = 10
    token = 1
    return this.favoritesService.paginate(
      {
        page,
        limit,
        route: '/favorites',
      },
      token
    );
  }

  @Get(':id')
  @HttpCode(403)
  @ApiForbiddenResponse({
    status: 403,
    description: 'Forbidden',
    schema: {
      example: {
        "statusCode": 403,
        "message": "Forbidden"
      }
    }
  })
  public async getById() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Favorite.' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Created',
    schema: {
      example: {
        "statusCode": 201,
        "message": "Created"
      }
    }
  })
  @ApiBody({ type: CreateFavoriteDto })
  @ApiQuery({
    name: 'token',
    type: Number,
    required: true,
    description: 'Token.',
    example: 1,
  })
  public create(
    @Query('token') token: number,
    @Body() createFavoriteDto: CreateFavoriteDto
    ) {
    token = 1
    this.favoritesService.create(createFavoriteDto, token);
    return ({
      "statusCode": 201,
      "message": "Created"
    })
  }

  @Patch()
  @HttpCode(403)
  @ApiForbiddenResponse({
    status: 403,
    description: 'Forbidden',
    schema: {
      example: {
        "statusCode": 403,
        "message": "Forbidden"
      }
    }
  })
  public update() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete Favorite' })
  @ApiOkResponse({
    status: 200,
    description: 'Ok',
    schema: {
      example: {
        "statusCode": 200,
        "message": "Ok"
      }
    }
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'The ID of the Favorite record to delete.',
    example: 1,
  })
  public delete(@Param('id') id: number) {
    this.favoritesService.delete(id);
    return ({
      "statusCode": 200,
      "message": "Ok"
    })
  }
}
