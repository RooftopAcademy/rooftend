import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../entities/notification.entity';
import { 
  ApiBody, 
  ApiCreatedResponse, 
  ApiNotFoundResponse, 
  ApiOkResponse, 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { NotificationDto } from '../entities/notification.dto';

@ApiTags('Notifications')
@Controller('/notifications')
export class NotificationController {
  constructor(private notificationServices: NotificationService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all notifications.',
  })
  @ApiOkResponse({
    status: 200,
    description: 'The found record.',
    type: Notification
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No resources found',
  })
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    res: Response,
  ): Promise<Pagination<Notification>> | any {
    try {
      limit = limit > 100 ? 100 : limit;
      return this.notificationServices.paginate({
        page,
        limit,
        route: '/notifications',
      });
    } catch (error) {
      return res.status(404).end(error.message);
    }
  }
  @ApiOperation({
    summary: 'Gets a record that matches the specified id.',
  })
  @ApiResponse({
    status: 200,
    description: 'The found record.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The specified notification was not found.',
  })
  @Get(':id')
  async getOne(@Param('id') id: number, res: Response) {
    try {
      return await this.notificationServices.findOne(id);
    } catch(error) {
      return res.status(404).end(error.message);
    }
  }

  @ApiOperation({
    summary: 'A notification is created.',
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Created notification.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The notification could not be created.',
  })
  @ApiBody({
    type: NotificationDto
  })
  @Post()
  async create(@Body() NotificationDto: NotificationDto, res: Response): Promise<void | Notification[]> {
    try {
      return this.notificationServices.create(NotificationDto);
    } catch (error) {
      return res.status(404).end(error.message);
    }
  }

  @ApiOperation({
    summary: 'A specific notification is updated.',
  })
  @ApiResponse({
    status: 200,
    description: 'Updated notification.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The specified notification was not found.',
  })
  @Put(':id')
  @ApiBody({
    type: NotificationDto
  })
  update(@Param('id') id: number, NotificationDto: NotificationDto, res: Response) {
    try {
      return this.notificationServices.update(id, NotificationDto);
    } catch (error) {
      return res.status(404).end(error.message);
    }
  }

  @ApiOperation({
    summary: 'A specific notification is deleted.',
  })
  @ApiResponse({
    status: 200,
    description: 'Deleted notification.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The specified notification was not found.',
  })
  @Delete(':id')
  delete(@Param('id') id: number, res: Response): Promise<Boolean> | any {
    try {
      return this.notificationServices.delete(id);
    } catch (error) {
      return res.status(404).end(error.message);
    }
  }
}
