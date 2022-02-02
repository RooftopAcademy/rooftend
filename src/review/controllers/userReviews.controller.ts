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

@ApiTags('User Reviews')
@Controller('reviews')
@UseInterceptors(ClassSerializerInterceptor)
export class UserReviewsController {
    constructor(
        private readonly userReviewsService: UserReviewsService,
        private readonly caslAbilityFactory: CaslAbilityFactory,
        private cartService: CartService
    ) { }


    @Post('/purchase/:carId/:cartItemId')
    @HttpCode(201)
    async create(
        @Req() req,
        @Body() reviewDTO: userReviewDTO,
        @Param() cartId: number,
        @Param() cardItemId: number,
    ) {
        const user: User = <User>req.user;
        const ability = this.caslAbilityFactory.createForUser(user);

        if (ability.cannot(Permission.Create, subject('UserReviews', UserReviews))) {
            throw new ForbiddenException();
        }

        const purchase = await this.cartService.findOneFromUser(cartId, user);
        if (!purchase && !purchase.purchasedAt) throw new ForbiddenException();

        return this.userReviewsService.create(reviewDTO, user);
    }

}