import {
  Controller,
  Get,
  HttpCode,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Category } from '../entities/categories.entity';
import { Public } from '../../authentication/decorators/public.decorator';
import {
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  public constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Returns all available categories' })
  @ApiOkResponse({
    status: 200,
    description: 'The categories available',
    schema: {
      example: {
        items: [
          {
            id: 1,
            name: 'TECHNOLOGY',
            subCategories: [
              {
                id: 12,
                name: 'CELL PHONES AND TELEPHONES',
              },
              {
                id: 13,
                name: 'COMPUTING',
              },
            ],
          },
          {
            id: 2,
            name: 'VEHICLES',
            subCategories: [
              {
                id: 25,
                name: 'CARS AND TRUCKS',
              },
              {
                id: 26,
                name: 'MOTORCYCLES',
              },
              {
                id: 27,
                name: 'TRUCKS',
              },
              {
                id: 28,
                name: 'NAUTICAL',
              },
              {
                id: 29,
                name: 'AGRICULTURAL MACHINERY',
              },
              {
                id: 30,
                name: 'MOTORHOMES',
              },
              {
                id: 31,
                name: 'VIA MACHINERY',
              },
            ],
          },
        ],
      },
    },
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Current page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Limit of paginated categories',
    example: 10,
  })
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Category>> {
    limit = limit > 100 ? 100 : limit;
    return this.categoriesService.paginate({
      page,
      limit,
      route: '/categories',
    });
  }

  @Get(':id')
  @Public()
  @HttpCode(200)
  @ApiOperation({ summary: ' Gets one category by id' })
  @ApiParam({ name: 'id', type: Number, required: true, example: 1 })
  @ApiOkResponse({
    status: 200,
    description: 'The category found.',
    schema: {
      example: {
        id: 1,
        name: 'TECHNOLOGY',
        subCategories: [
          {
            id: 12,
            name: 'CELL PHONES AND TELEPHONES',
          },
          {
            id: 13,
            name: 'COMPUTING',
          },
        ],
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Category not found.',
    schema: {
      example: new NotFoundException(
        'Category with id 10 not found',
      ).getResponse(),
    },
  })
  async findOne(@Param('id') id: number) {
    return this.categoriesService.findOneById(id);
  }
}
