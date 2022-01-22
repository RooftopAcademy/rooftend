import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserReviews } from "../entities/userReviews.entity";

@Injectable()
export class UserReviewsService {
    constructor(
        @InjectRepository(UserReviews)
        private readonly userReviewsRepository: Repository<UserReviews>,
    ) { }
}