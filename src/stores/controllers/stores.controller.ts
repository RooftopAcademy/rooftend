import {
  Controller,
  Get,
  Param,
  HttpCode,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { StoresService } from '../services/stores.service';
import { Public } from '../../authentication/decorators/public.decorator';
import { Store } from '../entities/stores.entity';

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
            id: '1',
            brand: {
              id: '1',
              name: 'Asus',
              photoUrl: 'http://dummyimage.com/100x100.png/dddddd/000000',
            },
          },
          {
            id: '2',
            brand: {
              id: '5',
              name: 'Xioami',
              photoUrl: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
            },
          },
        ],
        meta: {
          totalItems: 2,
          itemCount: 2,
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
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Limit of paginated stores',
    required: false,
    example: 10,
  })
  @Get()
  @Public()
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
    type: Store,
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
  @Public()
  @HttpCode(200)
  async getOne(@Param('id') id: number) {
    return await this.storesService.getOne(id);
  }
}
