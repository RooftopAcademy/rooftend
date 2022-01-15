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
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Request } from 'express';

import { ItemsService } from '../services/items.service';
import { Item } from '../entities/items.entity';
import { User } from '../../users/entities/user.entity';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { PoliciesGuard } from '../../auth/guards/policies.guard';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { CreateItemDto } from '../entities/create.item.dto';
import { UpdateItemDto } from '../entities/update.item.dto';
import { Public } from '../../authentication/decorators/public.decorator';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  /**
   * Retuns paginated list of items
   * @todo add authorization
   * @param sellerId - Show only items published by the user with this id
   * @param categoryId - Show only items published in the category with this id
   * @param orderBy - Sort items by this property
   * @param dir - Sort direction
   * @param page - Page of the result
   * @param limit - Max amount of items per page
   * @returns Filtered items according to preceding criteria
   */
  @ApiOperation({ summary: 'Get all items with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'A paginated item list',
    schema: {
      example: {
        items: [
          {
            id: '331',
            createdAt: '2022-01-15T21:56:42.157Z',
            updatedAt: '2022-01-15T21:56:42.157Z',
            title: 'Gherkin - Sour',
            description:
              'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
            price: 4271.85,
            stock: 1174,
            deletedAt: null,
            user: {
              id: '64',
              username: 'kdougharty1r',
              email: 'modriscole1r@cnn.com',
              account_status: 2,
              deletedAt: null,
              completed: false,
            },
            category: {
              id: 65,
              name: 'Clothing',
            },
            brand: {
              id: '66',
              name: 'functionalities',
              photoUrl: 'http://dummyimage.com/100x100.png/cc0000/ffffff',
            },
          },
        ],
        meta: {
          totalItems: 21,
          itemCount: 1,
          itemsPerPage: 1,
          totalPages: 21,
          currentPage: 1,
        },
      },
    },
  })
  @ApiQuery({
    required: false,
    name: 'sellerId',
    description: 'Show only items published by the user with this id',
  })
  @ApiQuery({
    required: false,
    name: 'categoryId',
    description: 'Show only items published in the category with this id',
  })
  @ApiQuery({
    required: false,
    name: 'orderBy',
    description: 'Sort items by this property',
    example: 'price',
  })
  @ApiQuery({
    required: false,
    name: 'dir',
    description: 'Sort direction',
    enum: ['ASC', 'DESC'],
    example: 'ASC',
  })
  @ApiQuery({
    required: false,
    name: 'page',
    description: 'Page of the result',
    example: 1,
  })
  @ApiQuery({
    required: false,
    name: 'limit',
    description: 'Max amount of items per page',
    example: 10,
  })
  @ApiBearerAuth()
  @Public()
  @Get()
  @HttpCode(200)
  getAll(
    @Req() req: Request,
    @Query('sellerId') sellerId?: number,
    @Query('categoryId') categoryId?: number,
    @Query('orderBy') orderBy?: string,
    @Query('dir') dir: 'ASC' | 'DESC' = 'ASC',
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Item, IPaginationMeta>> {
    page = page >= 1 ? page : 1;
    limit = limit <= 100 ? limit : 10;

    return this.itemsService.findAll(
      {
        exclude: true,
        sellerId,
        categoryId,
        orderBy,
        dir,
      },
      {
        page,
        limit,
      },
      <User>req.user,
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
    return this.itemsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create an item' })
  @ApiResponse({
    status: 201,
    description: 'The created item',
    type: Item,
  })
  @ApiBadRequestResponse({
    description: 'The item could not be created',
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged in',
  })
  @Post()
  @UseGuards(PoliciesGuard)
  @HttpCode(201)
  create(@Body() body: CreateItemDto): Promise<Item> {
    const user = new User();
    user.id = 1;

    return this.itemsService.create(user, body);
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
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiNotFoundResponse({
    description: 'Item Not Found',
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged in',
  })
  async update(
    @Param('id') id: number,
    @Body() body: UpdateItemDto,
  ): Promise<Item> {
    const user = new User();
    user.id = 1;

    const item = await this.itemsService.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.cannot(Permission.Update, subject('Item', item))) {
      throw new ForbiddenException();
    }

    return this.itemsService.update(item, body);
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
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged in',
  })
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @HttpCode(200)
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  delete(@Param('id') id: number): Promise<boolean> {
    const user = new User();
    user.id = 1;

    return this.itemsService.delete(user, id);
  }
}
