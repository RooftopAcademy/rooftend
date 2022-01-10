import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { Item } from '../entities/items.entity';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { PoliciesGuard } from '../../auth/guards/policies.guard';
import { Response } from 'express';
import { User } from '../../users/entities/user.entity';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly ItemsService: ItemsService) {}

  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the items',
    type: [Item],
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
  getOne(@Param('id') id: number, @Res() res: Response): Promise<Item> {
    try {
      return this.ItemsService.findOne(id);
    } catch (error) {
      res.status(404);
      return error.message;
    }
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
  @UseGuards(PoliciesGuard)
  @HttpCode(201)
  create(@Body() body: any): Promise<Item> {
    const user = new User();
    user.id = 1;

    return this.ItemsService.create(user, body);
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
  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @HttpCode(204)
  update(
    @Param('id') id: number,
    @Body() body: any,
    @Res() res: Response,
  ): Promise<Item> {
    const user = new User();
    user.id = 1;

    try {
      return this.ItemsService.update(user, id, body);
    } catch (error) {
      res.status(403);
      return error.message;
    }
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
  @UseGuards(PoliciesGuard)
  @HttpCode(200)
  delete(@Param('id') id: number, @Res() res: Response): Promise<boolean> {
    const user = new User();
    user.id = 1;

    try {
      return this.ItemsService.delete(user, id);
    } catch (error) {
      res.status(403);
      return error.message;
    }
  }
}
