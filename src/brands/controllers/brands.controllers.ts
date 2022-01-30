import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Brand } from '../entities/brands.entity';
import { BrandsService } from '../services/brands.service';
import { createBrandDTO } from '../entities/create-brands-dto.entity';
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../authentication/decorators/public.decorator';

@Public()
@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @ApiOperation({ summary: 'Paginate all brands' })
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
  @Get('/')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  ): Promise<Pagination<Brand>> {
    return this.brandService.paginate({
      page,
      limit: 50,
      route: '/brands',
    });
  }

  @ApiOperation({ summary: 'Get a brand by id' })
  @ApiResponse({
    status: 200,
    description: 'Shows the search result for a brand by id',
    type: Brand,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'BRAND_NOT_FOUND',
  })
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Brand> {
    return await this.brandService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a brand' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiConflictResponse({
    status: 409,
    description: 'BRAND_ALREADY_EXISTS',
  })
  @ApiBody({ type: createBrandDTO })
  @Post()
  async create(@Body() createBrandDTO: createBrandDTO): Promise<void> {
    await this.brandService.create(createBrandDTO);
  }

  @ApiOperation({ summary: 'Update a brand' })
  @ApiResponse({
    status: 200,
    description: 'Updated',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'BRAND_NOT_FOUND',
  })
  @ApiConflictResponse({
    status: 409,
    description: 'BRAND_NAME_ALREADY_EXISTS',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'Brand id',
  })
  @Patch(':id')
  async update(
    @Param() id: number,
    @Body() createBrandDTO: createBrandDTO,
  ): Promise<void> {
    await this.brandService.findOne(id);
    await this.brandService.update(id, createBrandDTO);
  }

  @ApiOperation({ summary: 'Delete a brand' })
  @ApiOkResponse({
    status: 200,
    description: 'Deleted',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'BRAND_NOT_FOUND',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'brand id',
    required: true,
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.brandService.findOne(id);
    await this.brandService.delete(id);
    HttpStatus.OK;
  }
}
