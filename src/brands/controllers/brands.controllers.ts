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
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
  @ApiNotFoundResponse({status: 404, description: 'No Brand was found that matches that id'})
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.brandService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a brands' })
  @ApiResponse({
    status: 201,
    description: 'The brand has been created successfully',
  })
  @ApiBadRequestResponse({
    description: 'The brand could not be created',
  })
  @Post()
  create(@Body() createBrandDTO: createBrandDTO) {
    return this.brandService.create(createBrandDTO);
  }

  @ApiOperation({ summary: 'Update a brands' })
  @ApiResponse({
    status: 200,
    description: 'The brand has been updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'The brand could not be updated',
  })
  @Patch()
  update(@Param() id: number, @Body() createBrandDTO: createBrandDTO) {
    return this.brandService.update(id, createBrandDTO);
  }

  @ApiOperation({ summary: 'Delete a brands' })
  @ApiResponse({
    status: 200,
    description: 'The brand has been deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'The brand could not be deleted',
  })
  @ApiNotFoundResponse({status: 404, description: 'No Brand was found that matches that id'})
  @Delete()
  delete(@Param('id') id: number) {
    return this.brandService.delete(id);
  }
}
