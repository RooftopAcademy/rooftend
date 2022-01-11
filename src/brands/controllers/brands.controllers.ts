import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Brand } from '../entities/brands.entity';
import { BrandsService } from '../services/brands.serveces';
import { createBrandDTO } from '../entities/create-brands-dto.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
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
  @Get('/')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Brand>> {
    limit = limit > 100 ? 100 : limit;
    return this.brandService.paginate({
      page,
      limit,
      route: '/brands',
    });
  }

  @ApiOperation({ summary: 'Get a brand by id' })
  @ApiResponse({
    status: 200,
    description: 'Shows the search result for a brand by id',
    type: Brand,
  })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.brandService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a brands' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiBody({ type: createBrandDTO })
  @Post()
  create(@Body() createBrandDTO: createBrandDTO) {
    return this.brandService.create(createBrandDTO);
  }

  @ApiOperation({ summary: 'Update a brands' })
  @ApiResponse({
    status: 200,
    description: 'Updated',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'Brand id'
  })
  @Patch(':id')
  update(@Param() id: number, @Body() createBrandDTO: createBrandDTO) {
    return this.brandService.update(id, createBrandDTO);
  }

  @ApiOperation({ summary: 'Delete a brands' })
  @ApiOkResponse({
    status: 200,
    description: 'Deleted',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'brand id'
  })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.brandService.delete(id);
  }
}
