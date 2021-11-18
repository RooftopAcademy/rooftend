import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

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
        const notofication = await this.notificationRepo.findOne(id);

        if(!notofication) {
            throw new Error('Notification not found.');
        };

        this.notificationRepo.merge(notofication, body);

        return this.notificationRepo.save(notofication);
    };

    async delete(id: number): Promise<Boolean> {
        await this.notificationRepo.delete(id);

        return true;
    };
}