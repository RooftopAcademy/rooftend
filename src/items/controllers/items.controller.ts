import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ItemsService } from '../services/items.service';
import { Item } from '../entities/items.entity';
import { User } from '../../users/entities/user.entity';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Request } from 'express';
import { Public } from '../../authentication/decorators/public.decorator';

@ApiTags('Items')
@ApiBearerAuth()
@Controller('items')
export class ItemsController {
  constructor(
    private readonly ItemsService: ItemsService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the items',
    type: [Item],
  })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'sellerId',
    type: Number,
    required: false,
    description: 'Id of the seller to filter',
  })
  @ApiQuery({
    name: 'categoryId',
    type: Number,
    required: false,
    description: 'Id of the category to filter',
  })
  @ApiQuery({
    name: 'orderBy',
    type: String,
    enum: ['price'],
    required: false,
    description: 'Property of the item to sort by',
  })
  @ApiQuery({
    name: 'dir',
    type: String,
    enum: ['ASC', 'DESC'],
    example: 'ASC',
    required: false,
    description: 'Sort direction',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    example: 1,
    description: 'The page to be requested',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    example: 10,
    description: 'The amount of items to be requested for page',
  })
  @Public()
  @Get()
  @HttpCode(200)
  getAll(
    @Req() req: Request,
    @Query('sellerId') sellerId: null,
    @Query('categoryId') categoryId: null,
    @Query('orderBy') orderBy: null,
    @Query('dir') dir: 'ASC' | 'DESC' = 'ASC',
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Item, IPaginationMeta>> {
    const fromRequest: any = req.user;
    const user: User = fromRequest?.result;

    page = page >= 1 ? page : 1;
    limit = limit <= 100 ? limit : 100;

    return this.ItemsService.findAll(
      {
        exclude: true,
        sellerId,
        categoryId,
        orderBy,
        dir,
      },
      {
        limit,
        page,
      },
      user,
    );
  }

  @ApiOperation({ summary: 'Get a single item by ID' })
  @ApiResponse({
    status: 200,
    description: 'A Item found with the passed ID',
    type: Item,
  })
  @Public()
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
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @Post()
  @HttpCode(201)
  create(@Req() req: Request, @Body() body: any): Promise<Item> {
    const user: any = req.user;

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
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @Patch(':id')
  @HttpCode(204)
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiNotFoundResponse({
    description: 'Item Not Found',
  })
  async update(@Req() req: Request, @Param('id') id: number, @Body() body: any): Promise<Item> {
    const user: any = req.user;

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
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @Delete(':id')
  @HttpCode(200)
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  async delete(@Req() req: Request, @Param('id') id: number): Promise<boolean> {
    const user: any = req.user;

    const item = await this.ItemsService.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.cannot(Permission.Delete, subject('Item', item))) {
      throw new ForbiddenException();
    }

    return this.ItemsService.delete(id);
  }
}
