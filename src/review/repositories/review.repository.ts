import { EntityRepository } from 'typeorm';
import { AbstractPolymorphicRepository } from 'typeorm-polymorphic';
import { Review } from '../review.entity';

@EntityRepository(Review)
export class ReviewRepository extends AbstractPolymorphicRepository<Review> {}
