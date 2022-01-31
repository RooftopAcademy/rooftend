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
import itemReviewDTO from '../entities/itemReview.create.dto';
import { subject } from '@casl/ability';
import { ItemsService } from '../../items/services/items.service';
import { ItemReviews } from '../entities/itemReviews.entity';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Reviews } from '../entities/reviews';
import { Permission } from '../../auth/enums/permission.enum';
import { Public } from '../../authentication/decorators/public.decorator';


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
  @Public()
  @HttpCode(200)
  @ApiOperation({ summary: 'List reviews' })
  @ApiQuery({
    name: 'filter',
    type: String,
    required: false,
    description: 'filter positives or negavatives reviews',
    example: 'POS',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Current page number. Defaults to 1.',
    example: 1,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of reviewed item',
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
        "items": [
          {
            "id": "23",
            "createdAt": "2022-01-25T14:09:50.308Z",
            "comment": "TEST",
            "score": 2,
            "likes_count": "0",
            "dislike_count": "0"
          },
          {
            "id": "24",
            "createdAt": "2022-01-25T14:09:54.966Z",
            "comment": "TEST3",
            "score": 1,
            "likes_count": "0",
            "dislike_count": "0"
          }
        ],
        "meta": {
          "totalItems": 2,
          "itemCount": 2,
          "itemsPerPage": 10,
          "totalPages": 1,
          "currentPage": 1
        },
        "links": {
          "first": "/reviews?limit=10",
          "previous": "",
          "next": "",
          "last": "/reviews?page=1&limit=10"
        },
      }
    },
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Param('id') id: number,
    @Query('filter') filter: 'POS' | 'NEG',
  ): Promise<Pagination<ItemReviews>> {
    limit = limit > 100 ? 100 : limit;
    return this.itemReviewsService.paginate(
      {
        page,
        limit,
        route: '/reviews',
      },
      id,
      filter);
  }

  @Post('purchase/:cartId')
  @HttpCode(201)
  async create(
    @Req() req,
    @Query('itemId') itemId: number,
    @Body() reviewDTO: itemReviewDTO,
    @Param() cartId: number,
  ) {
    const user: User = <User>req.user;
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.cannot(Permission.Create, subject('ItemReviews', ItemReviews))) {
      throw new ForbiddenException();
    }
    const purchase = await this.cartsService.findOneFromUser(cartId, user);
    if (!purchase) throw new ForbiddenException();

    // const cartItem = purchase.items.find((item: CartItem) => item.itemId == itemId);
    // if (!cartItem) throw new ForbiddenException();

    // const unreviewed = await this.itemReviewsService.findUnreviewedItem(1);
    // if (!unreviewed) throw new ForbiddenException();

    return this.itemReviewsService.create(reviewDTO, user, itemId);
  }
}
