import { subject } from "@casl/ability";
import { Body, ClassSerializerInterceptor, Controller, ForbiddenException, HttpCode, Param, Post, Req, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CaslAbilityFactory } from "../../auth/casl/casl-ability.factory";
import { Permission } from "../../auth/enums/permission.enum";
import { User } from "../../users/entities/user.entity";
import userReviewDTO from "../DTOs/userReview.create.dto";
import { UserReviewsService } from "../services/userReviews.service";
import { CartService } from "../../cart/services/cart.service";
import { UserReviews } from "../entities/userReviews.entity";
import { CartItemService } from "../../cart-item/services/cart-item.service";
import { ItemsService } from "../../items/services/items.service";
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