import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Review } from '../review.entity';

import { ReviewService } from '../services/review.service';

@Controller('reviews')
@UseInterceptors(ClassSerializerInterceptor)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @HttpCode(200)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Review>> {
    limit = limit > 100 ? 100 : limit;
    return this.reviewService.paginate({
      page,
      limit,
      route: '/reviews',
    });
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: any) {
    return this.reviewService.create(body);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() body: any) {
    return this.reviewService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
