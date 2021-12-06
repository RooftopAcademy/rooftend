import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Item } from '../../items/entities/items.entity';
import { SearchService } from '../services/search.service';

@Controller('search')
@ApiTags('Search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({
    summary: 'Searches items by title and saves the search keywords in the db.',
  })
  @ApiOkResponse({
    description: 'Array of items (6 max.) that match the search',
    type: Item,
    isArray: true,
  })
  @ApiQuery({
    name: 'q',
    type: String,
    required: false,
    description: 'Search keywords',
    example: 'televisor',
  })
  async findAll(@Query('q') query?: string) {
    return this.searchService.findAll(query ?? '');
  }
}
