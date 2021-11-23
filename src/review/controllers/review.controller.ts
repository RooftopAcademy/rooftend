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

@ApiTags('reviews')
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
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Maximum results per page. Max value: 100. Defaults to 10.',
  })
  @ApiOkResponse({
    description: 'Array with page contents and pagination metadata.',
    schema: {
      example: new Pagination<Review>(
        [
          {
            id: 1,
            userId: 4,
            subjectId: 1,
            subjectType: 'Item',
            score: 5,
            comment: 'Me encantó!',
            createdAt: new Date('2021-11-18T17:10:00.246Z'),
            updatedAt: new Date('2021-11-18T17:10:00.246Z'),
          },
          {
            id: 2,
            userId: 3,
            subjectId: 1,
            subjectType: 'Item',
            score: 3,
            comment: 'Cumple su función pero podría mejorar.',
            createdAt: new Date('2021-11-22T13:24:33.541Z'),
            updatedAt: new Date('2021-11-22T13:24:33.541Z'),
          },
        ],
        {
          itemCount: 2,
          itemsPerPage: 10,
          currentPage: 10,
        },
        {
          first: '/reviews?limit=10',
          previous: '',
          next: '',
          last: '/reviews?page=1&limit=10',
        },
      ),
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
  @ApiParam({ name: 'id', type: Number, required: true })
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
