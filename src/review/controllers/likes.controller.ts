import { subject } from "@casl/ability";
import { ClassSerializerInterceptor, Controller, ForbiddenException, HttpCode, Param, Post, Req, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { CaslAbilityFactory } from "../../auth/casl/casl-ability.factory";
import { Permission } from "../../auth/enums/permission.enum";
import { Public } from "../../authentication/decorators/public.decorator";
import { User } from "../../users/entities/user.entity";
import { Likes } from "../entities/likes.entity";
import { LikesService } from "../services/likes.service";
@ApiTags('Likes')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('reviews')
export class LikesController {
    constructor(
        private readonly likesService: LikesService,
        private readonly caslAbilityFactory: CaslAbilityFactory,
    ) { }


    @Post('/:id/:liked')
    @HttpCode(201)
    @ApiOperation({ summary: 'Like a item review' })
    async likeReview(
        @Param('liked') liked: boolean,
        @Param('id') reviewId: number,
        @Req() req: Request) {

        const user: User = <User>req.user;
        const ability = this.caslAbilityFactory.createForUser(user);
        if (ability.cannot(Permission.Create, subject('ItemReviews', Likes))) {
            throw new ForbiddenException();
        }
        return this.likesService.react(liked, user, reviewId)
    }
}