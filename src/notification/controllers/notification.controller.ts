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
  NotFoundException,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../entities/notification.entity';
import { 
  ApiBearerAuth,
  ApiBody, 
  ApiCreatedResponse, 
  ApiForbiddenResponse, 
  ApiNotFoundResponse, 
  ApiOkResponse, 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { UpdateNotificationDto } from '../entities/update.notification.dto';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Request } from 'express';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';

@ApiTags('Notifications')
@Controller('/notifications')
export class NotificationController {
  constructor(
    private notificationServices: NotificationService,
    private readonly caslAbilityFactory: CaslAbilityFactory) {}

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
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  async getAll(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Notification> | any> {

    const user: any = req.user;
    const notification = await this.notificationServices.findNotification(user.id);
    if (!notification) {
      return [];
    }
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.cannot(Permission.Read,  subject('Notification', notification))) {
      throw new ForbiddenException();
    }
    limit = limit > 100 ? 100 : limit;
    return this.notificationServices.paginate({
      page,
      limit,
      route: '/notifications',
    });
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
    type: UpdateNotificationDto
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
   async update(
     @Req() req:Request, 
     @Param('id') id: number, 
     @Body() body: UpdateNotificationDto
     ): Promise<Notification> {
    const user: any = req.user;
    const notification = await this.notificationServices.findOne(id);
    if (!notification) {
      throw new NotFoundException('Notification not found.');
    }
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.cannot(Permission.Read,  subject('Notification', notification))) {
      throw new ForbiddenException();
    }
    return this.notificationServices.update(notification, body);
  }

}
