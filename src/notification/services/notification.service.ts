import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(@InjectRepository(Notification) private notificationRepo: Repository<Notification>) { };

    findAll() {
        return this.notificationRepo.find();
    };

    findOne(id: number) {
        return this.notificationRepo.findOne(id);
    };

    create(body: any) {
        const notification = this.notificationRepo.create(body);

        return this.notificationRepo.save(notification);
    };

    async update(id: number, body: any) {
        const notofication = await this.notificationRepo.findOne(id);

        if(!notofication) {
            throw new Error('Notification not found.');
        };

        this.notificationRepo.merge(notofication, body);

        return this.notificationRepo.save(notofication);
    };

    async delete(id: number) {
        await this.notificationRepo.delete(id);

        return true;
    };
}
