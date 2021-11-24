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
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
 } from '@nestjs/swagger';

import { StoresService } from './stores.service';
import { StoresInterface } from '../models/stores.interface';
import { StoresEntity } from '../models/stores.entity';
import { Response } from 'express';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @ApiOperation({
    summary: 'Get a list of stores'
  })
  @ApiResponse({
    status: 200,
    description: 'A list of stores'
  })
  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<StoresInterface>> {
    limit = limit > 100 ? 100 : limit;
    return this.storesService.paginate({
      page,
      limit,
      route: '/stores',
    });
  }

  @ApiOperation({
    summary: 'Get store by Id'
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    example: 8
  })
  @ApiResponse({
    status: 200,
    description: 'A store'
  })
  @Get(':id')
  @HttpCode(200)
  async getOne(
    @Param('id') id: number,
    @Res() res: Response,
    ): Promise<StoresEntity | void> {
      const data = await this.storesService.getOne(id);

      if (!data) return res.status(404).end('404');

      return res.status(200).send(data).end();
  }

  @ApiOperation({
    summary: 'Create a new store'
  })
  @ApiResponse({
    status: 201,
    description: 'The new created store'
  })
  @Post()
  @HttpCode(201)
  create(@Body() store: StoresInterface): Promise<StoresInterface> {
    return this.storesService.create(store);
  }

  @ApiOperation({
    summary: 'Update a store'
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    example: 8
  })
  @ApiResponse({
    status: 204,
    description: 'The updated store'
  })
  @Patch(':id')
  @HttpCode(204)
  update(
    @Param('id') id: number,
    @Body() store: StoresInterface,
  ): Promise<UpdateResult> {
    return this.storesService.update(id, store);
  }

  @ApiOperation({
    summary: 'Delete a store'
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    example: 8
  })
  @ApiResponse({
    status: 204,
    description: 'The deleted store'
  })
  @Patch(':id')
  @Delete()
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.storesService.delete(id);
  }
}
