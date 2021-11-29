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
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { StoresService } from './stores.service';
import { StoresInterface } from '../models/stores.interface';
import { StoresEntity } from '../models/stores.entity';
import { Response } from 'express';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @ApiOperation({
    summary: 'Get a list of stores',
  })
  @ApiOkResponse({
    description: 'A list of stores',
    type: StoresEntity,
  })
  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    // return this.storesService.paginat({
    //   page,
    //   limit,
    //   route: '/stores',
    // });
  }

  @ApiOperation({
    summary: 'Get store by Id',
  })
  @ApiOkResponse({
    description: 'A store',
    type: StoresEntity,
  })
  @ApiNotFoundResponse({
    description: '404: Not Found',
    type: String,
  })
  @ApiParam({
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
  ): Promise<StoresEntity | void> {
    const data = await this.storesService.getOne(id);

    if (!data) return res.status(404).end('404');

    return res.status(200).send(data).end();
  }

  @ApiOperation({
    summary: 'Create a new store',
  })
  @ApiCreatedResponse({
    description: 'The store has been successfully created',
    type: StoresEntity,
  })
  @Post()
  @HttpCode(201)
  create(@Body() store: StoresInterface): Promise<StoresInterface> {
    return this.storesService.create(store);
  }

  @ApiOperation({
    summary: 'Update a store',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    example: 8,
  })
  @ApiResponse({
    status: 204,
    description: 'The store has been successfully updated',
    type: UpdateResult,
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
    summary: 'Delete a store',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    example: 8,
  })
  @ApiResponse({
    status: 204,
    description: 'The store has been successfully deleted',
    type: DeleteResult,
  })
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.storesService.delete(id);
  }
}
