import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Review } from '../review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Review>> {
    return paginate<Review>(this.reviewRepository, options);
  }

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
