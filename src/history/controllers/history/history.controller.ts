import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';

import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import { HistoryService } from '../../services/history/history.service';
import { History } from '../../models/history.entity';
import STATUS from '../../../statusCodes/statusCode';
import Status from '../../../statusCodes/status.interface';
import { CreateHistoryDto } from '../../models/create-history.dto';

@ApiTags('History')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @HttpCode(200)
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiOperation({ summary: 'Get last 50 visits' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the History',
    type: History,
  })
  getAll() {
    return this.historyService.get(1);
  }


  @Post('')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create visits' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Created',
    schema: {
      example: STATUS.CREATED
    }
  })
  @ApiBody({ type: CreateHistoryDto})
  async createVisit(@Body() visit: CreateHistoryDto): Promise<Status> {
    return await this.historyService.create(visit, 1)
  }


  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remove a history' })
  @ApiResponse({
    status: 200,
    description: 'The history has been removed successfully.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'The ID of the Visit record to delete.',
    example: 1,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiBadRequestResponse({
    description: 'Error, the deletion was not completed',
  })
  async delete(@Param('id') id: number): Promise<Status> {
    return await this.historyService.delete(id);
  }
}
