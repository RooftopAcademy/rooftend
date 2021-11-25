import { Pagination } from 'nestjs-typeorm-paginate';
import { NotificationService } from '../services/notification.service';
export declare class NotificationController {
    private notificationServices;
    constructor(notificationServices: NotificationService);
    getAll(page?: number, limit?: number): Promise<Pagination<Notification>>;
    getOne(id: number, res: any): Promise<any>;
    create(body: any): Promise<import("../../entities/notification.entity").Notification[]>;
    update(id: number, body: any): Promise<import("../../entities/notification.entity").Notification>;
    delete(id: number): Promise<Boolean>;
}
