import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { Item } from '../entities/items.entity';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags("Items")
@Controller('items')
export class ItemsController {
  constructor(private readonly ItemsService: ItemsService) { }

  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the items',
    type: Item,
  })
  @Get()
  @HttpCode(200)
  getAll(): Promise<Item[]> {
    return this.ItemsService.findAll();
  }

  @ApiOperation({ summary: 'Get a single item by ID' })
  @ApiResponse({
    status: 200,
    description: 'A Item found with the passed ID',
    type: Item,
  })
  @Get(':id')
  @HttpCode(200)
  getOne(@Param('id') id: number): Promise<Item> {
    return this.ItemsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a item' })
  @ApiResponse({
    status: 201,
    description: 'The created item',
    type: Item,
  })
  @ApiBadRequestResponse({
    description: 'The item could not be created',
  })
  @Post()
  @HttpCode(201)
  create(@Body() body: any): Promise<Item> {
    return this.ItemsService.create(body);
  }

  @ApiOperation({ summary: 'Update a item by ID' })
  @ApiResponse({
    status: 204,
    description: 'The updated item',
    type: Item,
  })
  @ApiBadRequestResponse({
    description: 'The item could not be updated',
  })
  @Put(':id')
  @HttpCode(204)
  update(@Param('id') id: number, @Body() body: any): Promise<Item> {
    return this.ItemsService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete a item by ID' })
  @ApiResponse({
    status: 200,
    description: 'If the item was removed or not',
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'The item could not be deleted',
  })
  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: number): Promise<boolean> {
    return this.ItemsService.delete(id);
  }
}
