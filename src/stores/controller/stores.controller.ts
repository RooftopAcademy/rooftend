import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  HttpCode,
  Body,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { StoresService } from './stores.service';
import { StoresInterface } from '../models/stores.interface';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get()
  @HttpCode(200)
  getAll(): Promise<StoresInterface[]> {
    return this.storesService.getAll();
  }

  @Get()
  @HttpCode(200)
  getOne(@Param('id') id: number): Promise<StoresInterface> {
    return this.storesService.getOne(id);
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
