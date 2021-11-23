import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Res,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { NotificationService } from '../services/notification.service';

@Controller('/notification')
export class NotificationController {
  constructor(private notificationServices: NotificationService) {}

  @Get()
  getAll() {
    try {
      this.notificationServices.findAll().then((data) => {
        return data;
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @Res() response) {
    return this.notificationServices
      .findOneById(id)
      .then((data) => {
        if (!data) {
          response.status(400).end('Platform not found');
        }
        return data;
      })
      .catch((err) => {
        response.status(400).end(err.message);
      });
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() createNotificationDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.notificationServices
      .create(createNotificationDTO)
      .then(() => {
        response.status(201).end('Platform created');
      })
      .catch((err) => {
        response.status(400).end(err.message);
      });
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id') id: string | number,
    @Body() createNotificationDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.notificationServices
      .findOneById(id)
      .then((data) => {
        if (!data) {
          response.status(400).end('Platform not found');
        }
        this.notificationServices.update(id, createNotificationDTO);
        response.status(200).end('Platform updated');
      })
      .catch((err) => {
        response.status(400).end(err.message);
      });
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.notificationServices
      .findOneById(id)
      .then((data) => {
        if (!data) {
          response.status(400).end('Platform not found');
        }
        this.notificationServices.remove(parseInt(id));
        response.status(200).end('Platform removed');
      })
      .catch((err) => {
        response.status(400).end(err.message);
      });
  }
}
