import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Brand } from '../entities/brands.entity';
import { BrandsService } from '../services/brands.serveces';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @ApiOperation({ summary: 'Paginate all brands' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the brands',
    type: Brand,
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
}
