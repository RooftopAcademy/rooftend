import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Brand } from '../entities/brands.entity';
import { BrandsService } from '../services/brands.serveces';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) { }

  @ApiOperation({ summary: 'Paginate all brands' })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Current page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'limit of paginated questions',
    example: 10,
  })
  @Get()
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Brand>> {
    limit = limit > 100 ? 100 : limit;
    return this.brandService.paginate({
      page,
      limit,
      route: '/brands',
    });
  }
  @ApiOperation({ summary: 'Get a brand by id' })
  @ApiOkResponse({
    status: 200,
    description: 'The found brand with that id',
    type: Brand,
  })
  @ApiNotFoundResponse({
    description: 'Brand not found.',
    schema: {
      example: new NotFoundException(
        'Brand with id 10 not found',
      ).getResponse(),
    },
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
  })
  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: number) {
    return this.brandService.findOne(id);
  }
}
