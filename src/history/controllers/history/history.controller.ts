import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { HistoryService } from '../../services/history/history.service';
import { History } from '../../models/history.entity';

@ApiTags('History')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get last 50 visits' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the History',
    type: History,
  })
  getAll() {
    return this.historyService.get(1);
  }


  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remove a history' })
  @ApiResponse({
    status: 200,
    description: 'The history has been removed successfully.',
  })
  delete(@Param('id') id) {
    return this.historyService.delete(id);
  }
}
