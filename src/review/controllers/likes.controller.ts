import { subject } from "@casl/ability";
import { Body, ClassSerializerInterceptor, Controller, ForbiddenException, HttpCode, Param, Post, Req, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { CaslAbilityFactory } from "../../auth/casl/casl-ability.factory";
import { Permission } from "../../auth/enums/permission.enum";
import { User } from "../../users/entities/user.entity";
import { Likes } from "../entities/likes.entity";
import { LikesService } from "../services/likes.service";
import LikeDTO from "../DTOs/like.dto";
@ApiTags('Likes')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('reviews')
export class LikesController {
    constructor(
        private readonly likesService: LikesService,
        private readonly caslAbilityFactory: CaslAbilityFactory,
    ) { }


    @Post('/:id')
    @HttpCode(201)
    @ApiOperation({ summary: 'Like a item review' })
    async likeReview(
        @Body() likeDTO: LikeDTO,
        @Param('id') reviewId: number,
        @Req() req: Request) {

        const user: User = <User>req.user;
        const ability = this.caslAbilityFactory.createForUser(user);

        if (ability.cannot(Permission.Create, subject('Likes', Likes))) {
            throw new ForbiddenException();
        }
        return this.likesService.react(likeDTO.liked, user, reviewId)
    }
}