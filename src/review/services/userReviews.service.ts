import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import Status from "../../statusCodes/status.interface";
import STATUS from "../../statusCodes/statusCodes";
import { User } from "../../users/entities/user.entity";
import { UserReviews } from "../entities/userReviews.entity";
import { opinionsEnum } from "../enum/opinions.enum"
import userReviewDTO from "../DTOs/userReview.create.dto";
import { UserService } from "../../users/services/user.service";

@Injectable()
export class UserReviewsService {
    constructor(
        @InjectRepository(UserReviews)
        private readonly userReviewsRepository: Repository<UserReviews>,
        private userService: UserService,
    ) { }


    async paginate(options: IPaginationOptions, userId: number, filter?: opinionsEnum): Promise<Pagination<UserReviews>> {
        let reviews = this.userReviewsRepository.createQueryBuilder('reviews')
            .leftJoin('reviews.user', 'user')
            .where('user.id = :userId', { userId })


        if (filter) {
            reviews.andWhere(`reviews.opinion = :opinion`, { opinion: filter })
        }
        return paginate<UserReviews>(reviews, options)
    }


    // it would return the created entity
    async create(review: userReviewDTO, user: User, reviewedId: number): Promise<Status> {
        try {
            console.log(review)
            let reviewedUser = await this.userService.returnLoggedUser(reviewedId);
            const reviewEntity = this.userReviewsRepository.create({ 'opinion': review.opinion, 'comment': review.comment, 'user': user, 'reviewed': reviewedUser });
            await this.userReviewsRepository.save(reviewEntity);
            return STATUS.CREATED
        }
        catch (err) {
            throw new UnprocessableEntityException();
        }
    }
}
