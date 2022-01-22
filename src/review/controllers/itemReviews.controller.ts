import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ItemReviewsService } from '../services/itemReviews.service';
import { CartService } from '../../cart/services/cart.service';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { User } from '../../users/entities/user.entity';
import CreateReviewDTO from '../entities/review.create.dto';
import { subject } from '@casl/ability';
import { ItemsService } from '../../items/services/items.service';
import { ItemReviews } from '../entities/itemReviews.entity';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Reviews } from '../entities/reviews';
import { Permission } from '../../auth/enums/permission.enum';


@ApiTags('Item Reviews')
@Controller('reviews')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemReviewsController {
  constructor(
    private readonly itemReviewsService: ItemReviewsService,
    private readonly cartsService: CartService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) { }

  @Get('item/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'List reviews' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Current page number. Defaults to 1.',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Maximum results per page. Max value: 100. Defaults to 10.',
    example: 10,
  })
  @ApiOkResponse({
    description: 'List of reviews and pagination metadata.',
    schema: {
      example: {
        items: [
          {
            id: 1,
            user: {
              id: 4,
              username: 'pepito',
              email: 'pepito@gmail.com',
              account_status: 1,
            },
            subjectId: 1,
            subjectType: 'User',
            score: 5,
            comment: 'Buen vendedor. Los envíos son a tiempo.',
            createdAt: new Date('2021-11-18T17:10:00.246Z'),
            updatedAt: new Date('2021-11-18T17:10:00.246Z'),
          },
          {
            id: 2,
            user: {
              id: 3,
              username: 'marcelo',
              email: 'marcelo@gmail.com',
              account_status: 1,
            },
            subjectId: 1,
            subjectType: 'User',
            score: 3,
            comment: 'Nunca contesta las preguntas.',
            createdAt: new Date('2021-11-22T13:24:33.541Z'),
            updatedAt: new Date('2021-11-22T13:24:33.541Z'),
          },
        ],
        meta: {
          itemCount: 2,
          itemsPerPage: 10,
          currentPage: 10,
        },
        links: {
          first: '/reviews?limit=10',
          previous: '',
          next: '',
          last: '/reviews?page=1&limit=10',
        },
      },
    },
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<ItemReviews>> {
    limit = limit > 100 ? 100 : limit;
    return this.itemReviewsService.paginate({
      page,
      limit,
      route: '/reviews',
    });
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get a review by its id' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    example: 1,
  })
  @ApiOkResponse({
    status: 200,
    description: 'The found review.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found.',
    schema: {
      example: new NotFoundException('Review not found').getResponse(),
    },
  })
  findOne(@Param('id') id: string) {
    return this.itemReviewsService.findOne(id);
  }

  @Post('purchase/:cartId')
  @HttpCode(201)
  async create(
    @Req() req,
    @Query('itemId') itemId: number,
    @Body() reviewDTO: CreateReviewDTO,
    @Param() cartId: number,
  ) {
    const user: User = <User>req.user;
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.cannot(Permission.Create, subject('ItemReviews', ItemReviews))) {
      throw new ForbiddenException();
    }
    const purchase = await this.cartsService.findOneFromUser(cartId, user);
    if (!purchase) throw new ForbiddenException();

    const cartItem = purchase.items.find((item: CartItem) => item.itemId == itemId);
    if (!cartItem) throw new ForbiddenException();

    const unreviewed = await this.itemReviewsService.findUnreviewedItem(itemId);
    if (!unreviewed) throw new ForbiddenException();

    return this.itemReviewsService.create(reviewDTO, user, itemId);
  }
}
