import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UnprocessableEntityException,
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
  ApiUnprocessableEntityResponse,
  ApiBody,
} from '@nestjs/swagger';

import { Request } from 'express';

import { ItemsService } from '../services/items.service';
import { Item } from '../entities/items.entity';
import { User } from '../../users/entities/user.entity';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { CreateItemDto } from '../entities/create.item.dto';
import { UpdateItemDto } from '../entities/update.item.dto';
import { Public } from '../../authentication/decorators/public.decorator';
import STATUS from '../../statusCodes/statusCodes';
import Status from '../../statusCodes/status.interface';

@ApiTags('Items')
@ApiBearerAuth()
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
    @Query('sellerId', new DefaultValuePipe(null))
    sellerId?: number,
    @Query('categoryId', new DefaultValuePipe(null))
    categoryId?: number,
    @Query('orderBy') orderBy?: string,
    @Query('dir', new DefaultValuePipe('ASC')) dir: 'ASC' | 'DESC' = 'ASC',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Item, IPaginationMeta>> {
    const user: User = <User>req.user;

    page = page >= 1 ? page : 1;
    limit = limit <= 100 ? limit : 100;

    return this.itemsService.findAll(
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
    schema: {
      example: new NotFoundException('Item not found').getResponse(),
    },
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
    description: 'Validation error',
    schema: {
      example: new BadRequestException([
        'title must be longer than or equal to 1 characters',
      ]).getResponse(),
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged in',
  })
  @ApiUnprocessableEntityResponse({
    description: 'The categoryId or brandId supplied does not exist',
    schema: {
      example: new UnprocessableEntityException(
        'Category does not exist',
      ).getResponse(),
    },
  })
  @ApiBearerAuth()
  @Post()
  @HttpCode(201)
  create(@Req() req: Request, @Body() body: CreateItemDto): Promise<Item> {
    const user: User = <User>req.user;

    return this.itemsService.create(user, body);
  }

  @ApiOperation({ summary: 'Update an item by ID' })
  @ApiBody({ type: UpdateItemDto, required: false })
  @ApiResponse({
    status: 200,
    description: 'Item updated successfully',
    schema: {
      example: STATUS.OK,
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    schema: {
      example: new BadRequestException([
        'title must be longer than or equal to 1 characters',
      ]).getResponse(),
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'User is not authorized to update this item',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Item Not Found',
    schema: {
      example: new NotFoundException('Item not found').getResponse(),
    },
  })
  @ApiBearerAuth()
  @Patch(':id')
  @HttpCode(200)
  async update(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() body: UpdateItemDto,
  ): Promise<Status> {
    const user: User = <User>req.user;

    const item = await this.itemsService.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.cannot(Permission.Update, subject('Item', item))) {
      throw new ForbiddenException();
    }

    await this.itemsService.update(item, body);

    return STATUS.OK;
  }

  @ApiOperation({ summary: 'Delete an item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Item deleted sucessfully',
    schema: {
      example: STATUS.DELETED,
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'User is not authorized to delete this item',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Item Not Found',
    schema: {
      example: new NotFoundException('Item not found').getResponse(),
    },
  })
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  async delete(@Req() req: Request, @Param('id') id: number): Promise<Status> {
    const user: User = <User>req.user;

    const item = await this.itemsService.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.cannot(Permission.Delete, subject('Item', item))) {
      throw new ForbiddenException();
    }

    await this.itemsService.delete(item);

    return STATUS.DELETED;
  }
}
