import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';

@Controller('/notification')
export class NotificationController {
    constructor(private notificationServices: NotificationService) { };

    @Get()
    getAll(): Promise<Notification[]> {
        return this.notificationServices.findAll();
    };

    @Get(':id')
    getOne(@Param('id') id: number): Promise<Notification> {
        return this.notificationServices.findOne(id);
    };

    @Post()
    create(@Body() body: any): Promise<Notification[]> {
        return this.notificationServices.create(body);
    };

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any): Promise<Notification> {
        return this.notificationServices.update(id, body);
    };

    @Delete(':id')
    delete(@Param('id') id: number): Promise<Boolean> {
        return this.notificationServices.delete(id);
    };
}
