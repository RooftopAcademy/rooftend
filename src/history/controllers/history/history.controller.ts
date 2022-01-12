import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HistoryService } from '../../services/history/history.service';
import { History } from '../../models/history.entity';
import { PoliciesGuard } from '../../../auth/guards/policies.guard';

@ApiTags('history')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {};

  @ApiOperation({ summary: 'Get all history' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the History',
    type: History,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @Get()
  @UseGuards(PoliciesGuard)
  @HttpCode(200)
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.historyService.paginate({
      page,
      limit,
      route: '/history',
    });
  };

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @ApiOperation({ summary: 'Remove a history' })
  @ApiResponse({
    status: 200,
    description: 'The history has been removed successfully.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @HttpCode(200)
  delete(@Param('id') id: number): Promise<boolean> {
    return this.historyService.delete(id);
  };
}
