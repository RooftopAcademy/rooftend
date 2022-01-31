import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import Status from "../../statusCodes/status.interface";
import STATUS from "../../statusCodes/statusCodes";
import { User } from "../../users/entities/user.entity";
import { UserReviews } from "../entities/userReviews.entity";
import { opinionsEnum } from "../entities/opinions.enum"
import userReviewDTO from "../entities/userReview.create.dto";
import { UserService } from "../../../dist/users/services/user.service";

@Injectable()
export class UserReviewsService {
    constructor(
        @InjectRepository(UserReviews)
        private readonly userReviewsRepository: Repository<UserReviews>,
        private userService: UserService,
    ) { }

    async paginate(options: IPaginationOptions, filter?: opinionsEnum) {
        let reviews = this.userReviewsRepository.createQueryBuilder('reviews')

        return paginate<UserReviews>(reviews, options)
    }



    // it would return the created entity
    async create(review: userReviewDTO, user: User): Promise<Status> {
        try {

            const reviewEntity = this.userReviewsRepository.create({ ...review, user: user });
            await this.userReviewsRepository.save(reviewEntity);
            return STATUS.CREATED
        }
        catch (err) {
            throw new UnprocessableEntityException();
        }
    }
}
