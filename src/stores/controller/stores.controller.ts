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
import { DeleteResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

import { StoresService } from './stores.service';
import { StoresInterface } from '../models/stores.interface';
import { StoresEntity } from '../models/stores.entity';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<StoresEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.storesService.paginate({
      page,
      limit,
      route: '/stores',
    });
  }

  @Get()
  @HttpCode(200)
  getOne(@Param('id') id: number, @Res() res) {
    this.storesService
      .getOne(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return res.status(404).end(err.message);
      });
  }

  @Post()
  @HttpCode(201)
  create(@Body() store: StoresInterface): Promise<StoresInterface> {
    return this.storesService.create(store);
  }

  @Patch(':id')
  @HttpCode(204)
  update(
    @Param('id') id: number,
    @Body() store: StoresInterface,
  ): Promise<StoresInterface> {
    return this.storesService.update(id, store);
  }

  @Delete()
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.storesService.delete(id);
  }
}
