import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReviewService } from '../services/review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Post()
  create() {
    return this.reviewService.create();
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.reviewService.update(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
