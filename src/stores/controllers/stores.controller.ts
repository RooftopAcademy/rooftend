import {
  Controller,
  Get,
  Param,
  HttpCode,
  Res,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ReadStoreDto } from '../entities/read-store.dto';
import { Response } from 'express';
import { StoresService } from '../services/stores.service';

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
        items: [
          {
            id: '23',
            username: 'miUsuario',
            brand: 'Xiaomi',
          },
        ],
        meta: {
          totalItems: 1,
          itemCount: 1,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
        links: {
          first: '/stores?limit=10',
          previous: '',
          next: '',
          last: '/stores?page=1&limit=10',
        },
      },
    },
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Requiered page',
    required: false,
    example: 3,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Limit of paginated stores',
    required: false,
    example: 25,
  })
  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
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
    status: 200,
    description: 'Ok',
    type: ReadStoreDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Store not found',
        error: 'Not Found',
      },
    },
  })
  @ApiParam({
    type: Number,
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
}
