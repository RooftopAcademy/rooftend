import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';

@Controller('/notification')
export class NotificationController {
    constructor(private notificationServices: NotificationService) { };

    @Get()
    getAll(): Promise<Notification[]> {
        try {
            return this.notificationServices.findAll();
        } catch(error) {
            console.log(`Error: ${error}`);
        };
    };

    @Get(':id')
    getOne(@Param('id') id: number): Promise<Notification> {
        try {
            return this.notificationServices.findOne(id);
        } catch(error) {
            console.log(`Error: ${error}`);
        };
    };

    @Post()
    create(@Body() body: any): Promise<Notification[]> {
        try {
            return this.notificationServices.create(body);
        } catch(error) {
            console.log(`Error: ${error}`);
        };
    };

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any): Promise<Notification> {
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
