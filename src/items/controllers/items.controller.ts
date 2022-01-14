import {
  Body,
  Controller,
  Delete, ForbiddenException,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { ItemsService } from '../services/items.service';
import { Item } from '../entities/items.entity';
import { User } from '../../users/entities/user.entity';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { PoliciesGuard } from '../../auth/guards/policies.guard';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly ItemsService: ItemsService,
              private readonly caslAbilityFactory: CaslAbilityFactory) {}

  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the items',
    type: [Item],
  })
  @Get()
  @HttpCode(200)
  getAll(
    @Query('sellerId') sellerId : null,
    @Query('categoryId') categoryId : null,
    @Query('orderBy') orderBy : null,
    @Query('dir') dir : string = 'ASC',
  ): Promise<Pagination<Item, IPaginationMeta>> {
    const user = new User()
    user.id = 1

    return this.ItemsService.findAll({
      exclude : true, sellerId, categoryId, orderBy
    }, user);
  }

  @ApiOperation({ summary: 'Get a single item by ID' })
  @ApiResponse({
    status: 200,
    description: 'A Item found with the passed ID',
    type: Item,
  })
  @Get(':id')
  @HttpCode(200)
  @ApiNotFoundResponse({
    description: 'Item Not Found',
  })
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
  @HttpCode(204)
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiNotFoundResponse({
    description: 'Item Not Found',
  })
  async update(@Param('id') id: number, @Body() body: any): Promise<Item> {
    const user = new User();
    user.id = 1;

    const item = await this.ItemsService.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.cannot(Permission.Update, subject('Item', item))) {
      throw new ForbiddenException();
    }

    return this.ItemsService.update(item, body);
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
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  delete(@Param('id') id: number): Promise<boolean> {
    const user = new User();
    user.id = 1;

    return this.ItemsService.delete(user, id);
  }
}
