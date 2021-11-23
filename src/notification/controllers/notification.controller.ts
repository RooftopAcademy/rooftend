import { Body, Controller, Get, Param, Post, Put, Delete, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { NotificationService } from '../services/notification.service';
import { Notification } from 'src/notification/entities/notification.entity';

@Controller('/notification')
export class NotificationController {
    constructor(
        private notificationServices: NotificationService
    ) { };

    @Get()
    getAll(
        @Query('page') page: number = 1, 
        @Query('limit') limit: number = 10,
        res: Response,
    ) : Promise<Pagination<Notification>>|any {
        try {
            limit = limit > 100 ? 100: limit;

            return this.notificationServices.paginate({page, limit, route: '/notification'});
        } catch(error) {
            return res.status(404).end(error.message);
        };
    };

    @Get(':id')
    async getOne(@Param('id') id: number, @Res() res) {
        try {
            return await this.notificationServices.findOne(id);
        } catch(error) {
            return res.status(404).end(error.message);
        };
    };

    @Post()
    create(@Body() body: any, res: Response) {
        try {
            return this.notificationServices.create(body);
        } catch(error) {
            return res.status(404).end(error.message);
        };
    };

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any, res: Response) {
        try {
            return this.notificationServices.update(id, body);
        } catch(error) {
            return res.status(404).end(error.message);
        };
    };

    @Delete(':id')
    delete(@Param('id') id: number, res: Response): Promise<Boolean>|any {
        try {
            return this.notificationServices.delete(id);
        } catch(error) {
            return res.status(404).end(error.message);
        };
    };
}
