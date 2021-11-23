import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Notification } from '../notification.entity';

@Injectable()
export class NotificationService {
    constructor(@InjectRepository(Notification) private notificationRepo: Repository<Notification>) { };

    findAll(): Promise<Notification[]> {
        return this.notificationRepo.find();
    };

    findOne(id: number): Promise<Notification> {
        return this.notificationRepo.findOne(id);
    };

    create(body: any): Promise<Notification[]> {
        const notification = this.notificationRepo.create(body);

        return this.notificationRepo.save(notification);
    };

    async update(id: number, body: any): Promise<Notification> {
        const notification = await this.notificationRepo.findOne(id);

        if(!notification) {
            throw new Error('Notification not found.');
        };

        this.notificationRepo.merge(notification, body);

        return this.notificationRepo.save(notification);
    };

    async delete(id: number): Promise<Boolean> {
        await this.notificationRepo.delete(id);

        return true;
    };

    async paginate(options: IPaginationOptions): Promise<Pagination<Notification>> {
        return paginate<Notification>(this.notificationRepo, options);
    };
}
