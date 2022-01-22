import { ClassSerializerInterceptor, Controller, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CaslAbilityFactory } from "../../auth/casl/casl-ability.factory";
import { UserReviewsService } from "../services/userReviews.service";

@ApiTags('User Reviews')
@Controller('reviews')
@UseInterceptors(ClassSerializerInterceptor)
export class UserReviewsController {
    constructor(
        private readonly userReviewsService: UserReviewsService,
        private readonly caslAbilityFactory: CaslAbilityFactory,
    ) { }
}