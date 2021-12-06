import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  HttpCode,
  Body,
  Res,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import {
  DeleteResult,
  UpdateResult,
} from 'typeorm';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateStoreDto } from '../models/create-store.dto';
import { ReadStoreDto } from '../models/read-store.dto';
import { Response } from 'express';
import { StoresService } from './stores.service';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @ApiOperation({
    summary: 'Get a list of stores',
  })
  @ApiOkResponse({
    description: 'A list of stores',
    schema: {
      example: {
        "items": [
            {
                "id": "23",
                "username": "miUsuario",
                "brand": "Xiaomi"
            }
        ],
        "meta": {
            "totalItems": 1,
            "itemCount": 1,
            "itemsPerPage": 10,
            "totalPages": 1,
            "currentPage": 1
        },
        "links": {
            "first": "/stores?limit=10",
            "previous": "",
            "next": "",
            "last": "/stores?page=1&limit=10"
        }
      }
    }
  })
  @ApiQuery({
    name: 'page',
    description: 'Requiered page',
    required: false,
    example: 3,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of results per page',
    required: false,
    example: 25,
  })
  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.storesService.paginate({
      page,
      limit,
      route: '/stores',
    });
  }

  @ApiOperation({
    summary: 'Get store by Id',
  })
  @ApiOkResponse({
    description: 'A store',
    type: ReadStoreDto,
  })
  @ApiNotFoundResponse({
    description: '404: Not Found',
    schema: {
      example: {
        "statusCode": 404,
        "message": "Store not found",
        "error": "Not Found"
      }
    }
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the requested store',
    required: true,
    example: 8,
  })
  @Get(':id')
  @HttpCode(200)
  async getOne(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<ReadStoreDto | void> {
    const data = await this.storesService.getOne(id);

    if (!data) throw new NotFoundException('Store not found');

    return res.status(200).send(data).end();
  }

  @ApiOperation({
    summary: 'Create a new store',
  })
  @ApiCreatedResponse({
    description: 'The store has been successfully created',
    type: CreateStoreDto,
  })
  @ApiBody({
    type: CreateStoreDto,
    required: true,
  })
  @Post()
  @HttpCode(201)
  async create(
    @Body() createStoreDto: CreateStoreDto,
  ): Promise<CreateStoreDto> {
    return this.storesService.create(createStoreDto);
  }

  @ApiOperation({
    summary: 'Update a store',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    example: 8,
  })
  @ApiResponse({
    status: 204,
    description: 'The store has been successfully updated',
  })
  @ApiNotFoundResponse({
    description: '404: Not Found',
    schema: {
      example: {
        "statusCode": 404,
        "message": "Store not found",
        "error": "Not Found"
      }
    }
  })
  @ApiBody({
    type: CreateStoreDto,
    required: true,
  })
  @Patch(':id')
  @HttpCode(204)
  update(
    @Param('id') id: number,
    @Body() store: CreateStoreDto,
  ): Promise<UpdateResult> {
    console.log(store);
    return this.storesService.update(id, store);
  }

  @ApiOperation({
    summary: 'Delete a store',
  })
  @ApiNotFoundResponse({
    description: '404: Not Found',
    schema: {
      example: {
        "statusCode": 404,
        "message": "Store not found",
        "error": "Not Found"
      }
    }
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    example: 8,
  })
  @ApiResponse({
    status: 204,
    description: 'The store has been successfully deleted',
  })
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.storesService.delete(id);
  }
}
