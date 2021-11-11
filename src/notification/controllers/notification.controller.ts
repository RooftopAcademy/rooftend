import { Body, Controller, Get, Param, Post, Put, Delete, Res, Patch, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { NotificationService } from '../services/notification.service';

@Controller('/notification')
export class NotificationController {
    constructor(
        private notificationServices: NotificationService
    ) { };

    @Get()
    getAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10,) : Promise<Notification[]>  {
        try {
            //return this.notificationServices.findAll();
            limit = limit > 100 ? 100: limit;
            return this.notificationServices.paginate({page, limit, route: 'http://localhost:3000/notification'});
        } catch(error) {
            console.log(`Error: ${error}`);
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
    create(@Body() body: any) {
        try {
            return this.notificationServices.create(body);
        } catch(error) {
            console.log(`Error: ${error}`);
        };
    };

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any) {
        try {
            return this.notificationServices.update(id, body);
        } catch(error) {
            console.log(`Error: ${error}`);
        };
    };

    @Delete(':id')
    delete(@Param('id') id: number): Promise<Boolean> {
        try {
            return this.notificationServices.delete(id);
        } catch(error) {
            console.log(`Error: ${error}`);
        };
    };
}
