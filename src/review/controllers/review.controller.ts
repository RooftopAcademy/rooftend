import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Review } from '../review.entity';

import { ReviewService } from '../services/review.service';

@ApiTags('Reviews')
@Controller('reviews')
@UseInterceptors(ClassSerializerInterceptor)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'List reviews' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Current page number. Defaults to 1.',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Maximum results per page. Max value: 100. Defaults to 10.',
    example: 10,
  })
  @ApiOkResponse({
    description: 'List of reviews and pagination metadata.',
    schema: {
      example: {
        items: [
          {
            id: 1,
            user: {
              id: 4,
              username: 'pepito',
              email: 'pepito@gmail.com',
              account_status: 1,
            },
            subjectId: 1,
            subjectType: 'User',
            score: 5,
            comment: 'Buen vendedor. Los envíos son a tiempo.',
            createdAt: new Date('2021-11-18T17:10:00.246Z'),
            updatedAt: new Date('2021-11-18T17:10:00.246Z'),
          },
          {
            id: 2,
            user: {
              id: 3,
              username: 'marcelo',
              email: 'marcelo@gmail.com',
              account_status: 1,
            },
            subjectId: 1,
            subjectType: 'User',
            score: 3,
            comment: 'Nunca contesta las preguntas.',
            createdAt: new Date('2021-11-22T13:24:33.541Z'),
            updatedAt: new Date('2021-11-22T13:24:33.541Z'),
          },
        ],
        meta: {
          itemCount: 2,
          itemsPerPage: 10,
          currentPage: 10,
        },
        links: {
          first: '/reviews?limit=10',
          previous: '',
          next: '',
          last: '/reviews?page=1&limit=10',
        },
      },
    },
  })
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
  @ApiOperation({ summary: 'Get a review by its id' })
  @ApiParam({ name: 'id', type: Number, required: true, example: 1 })
  @ApiOkResponse({
    type: Review,
    description: 'The found review.',
  })
  @ApiNotFoundResponse({
    description: 'Review not found.',
    schema: {
      example: new NotFoundException('Review not found').getResponse(),
    },
  })
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
