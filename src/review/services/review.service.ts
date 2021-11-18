import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from '../repositories/review.repository';
import { Review } from '../review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewRepository)
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async findOne(id: string | number): Promise<Review> {
    const review: Review | undefined = await this.reviewRepository.findOne(id);

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found.`);
    }

    return review;
  }

  create(body: any) {
    // it would return the created entity
    return {
      id: 4,
      title: 'title 4',
      content: 'content 4',
      user: {},
      item: {},
    };
  }

  update(id: string, body: any) {
    // it would return the updated entity
    return {
      id: 1,
      title: 'updated title',
      content: 'updated content',
      user: {},
      item: {},
    };
  }

  delete(id: string) {
    return;
  }
}
