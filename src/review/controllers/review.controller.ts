import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ReviewService } from '../services/review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create() {
    return this.reviewService.create();
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string) {
    return this.reviewService.update(id);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
