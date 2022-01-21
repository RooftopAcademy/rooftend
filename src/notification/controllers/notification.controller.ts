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
import { NotificationDto } from '../entities/notification.dto';
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
    const notification = await this.notificationServices.findOne(user.id);
    if (!notification) {
      throw new NotFoundException('Notification not found.');
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
  // @ApiOperation({
  //   summary: 'Gets a record that matches the specified id.',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record.',
  // })
  // @ApiNotFoundResponse({
  //   status: 404,
  //   description: 'The specified notification was not found.',
  // })
  // @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  // @ApiBearerAuth()
  // @Get(':id')
  // async getOne(@Req() req:Request, @Param('id') id: number, res: Response) {
  //   const user: any = req.user;
  //   const notification = await this.notificationServices.findOne(user.id);
  //   if (!notification) {
  //     throw new NotFoundException('Notification not found.');
  //   }
  //   const ability = this.caslAbilityFactory.createForUser(user);
  //   if (ability.cannot(Permission.Read, subject('Notification', notification))) {
  //     throw new ForbiddenException();
  //   }
  //   return notification;
  // }

  // @ApiOperation({
  //   summary: 'A notification is created.',
  // })
  // @ApiCreatedResponse({
  //   status: 201,
  //   description: 'Created notification.',
  // })
  // @ApiNotFoundResponse({
  //   status: 404,
  //   description: 'The notification could not be created.',
  // })
  // @ApiBody({
  //   type: NotificationDto
  // })
  // @Post()
  // async create(@Body() NotificationDto: NotificationDto, res: Response): Promise<void | Notification[]> {
  //   try {
  //     return this.notificationServices.create(NotificationDto);
  //   } catch (error) {
  //     return res.status(404).end(error.message);
  //   }
  // }

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
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
   async update(
     @Req() req:Request, 
     @Param('id') id: number, 
     NotificationDto: NotificationDto
     ): Promise<Notification> {
    const user: any = req.user;
    const notification = await this.notificationServices.findOne(user.id);
    if (!notification) {
      throw new NotFoundException('Notification not found.');
    }
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.cannot(Permission.Read,  subject('Notification', notification))) {
      throw new ForbiddenException();
    }
    return this.notificationServices.update(id, NotificationDto);
  }

}
