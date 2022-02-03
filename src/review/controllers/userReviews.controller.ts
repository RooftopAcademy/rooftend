import { subject } from "@casl/ability";
import { Body, ClassSerializerInterceptor, Controller, DefaultValuePipe, ForbiddenException, Get, HttpCode, Param, ParseIntPipe, Post, Query, Req, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CaslAbilityFactory } from "../../auth/casl/casl-ability.factory";
import { Permission } from "../../auth/enums/permission.enum";
import { User } from "../../users/entities/user.entity";
import userReviewDTO from "../DTOs/userReview.create.dto";
import { UserReviewsService } from "../services/userReviews.service";
import { CartService } from "../../cart/services/cart.service";
import { UserReviews } from "../entities/userReviews.entity";
import { CartItemService } from "../../cart-item/services/cart-item.service";
import { ItemsService } from "../../items/services/items.service";
import { Pagination } from "nestjs-typeorm-paginate";
import { opinionsEnum } from "../enum/opinions.enum";
import { Public } from "../../authentication/decorators/public.decorator";
@ApiTags('User Reviews')
@Controller('reviews')
@UseInterceptors(ClassSerializerInterceptor)
export class UserReviewsController {
    constructor(
        private readonly userReviewsService: UserReviewsService,
        private readonly caslAbilityFactory: CaslAbilityFactory,
        private cartService: CartService,
        private cartItemService: CartItemService,
        private itemsService: ItemsService,

    ) { }

    @Get('user/:id')
    @Public()
    @HttpCode(200)
    @ApiOperation({ summary: 'List reviews of seller' })
    @ApiQuery({
        name: 'filter',
        type: String,
        required: false,
        description: 'filter positives or negavatives reviews',
        example: 'REGULAR',
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
        description: 'Id of reviewed user',
        example: 1,
    })
    @ApiQuery({
        name: 'limit',
        type: Number,
        required: false,
        description: 'Maximum results per page. Max value: 100. Defaults to 10.',
        example: 10,
    })
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
        @Param('id') id: number,
        @Query('filter') filter: opinionsEnum,
    ): Promise<Pagination<UserReviews>> {
        limit = limit > 100 ? 100 : limit;
        return this.userReviewsService.paginate(
            {
                page,
                limit,
                route: '/reviews',
            },
            id,
            filter);
    }

    @Post('/purchase/:carId/user/:reviewedId')
    @HttpCode(201)
    async create(
        @Req() req,
        @Body() reviewDTO: userReviewDTO,
        @Param('carId') cartId: number,
        @Param('reviewedId') reviewedId: number,
    ) {
        const user: User = <User>req.user;
        const ability = this.caslAbilityFactory.createForUser(user);

        if (ability.cannot(Permission.Create, subject('UserReviews', UserReviews))) {
            throw new ForbiddenException();
        }

        const purchase = await this.cartService.findOneFromUser(cartId, user);
        if (!purchase && !purchase.purchasedAt) throw new ForbiddenException();

        const cartItem = await this.cartItemService.findOne(cartId, reviewDTO.itemId);
        if (!cartItem && cartItem.item.id != reviewDTO.itemId) throw new ForbiddenException();

        const item = await this.itemsService.findOne(reviewDTO.itemId);
        if (!item && item.user.id != reviewedId) throw new ForbiddenException();

        return this.userReviewsService.create(reviewDTO, user, reviewedId);
    }

}