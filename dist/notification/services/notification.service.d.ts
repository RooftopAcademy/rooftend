import { Repository } from 'typeorm';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Notification } from 'src/entities/notification.entity';
export declare class NotificationService {
    private notificationRepo;
    constructor(notificationRepo: Repository<Notification>);
    findAll(): Promise<Notification[]>;
    findOne(id: number): Promise<Notification>;
    create(body: any): Promise<Notification[]>;
    update(id: number, body: any): Promise<Notification>;
    delete(id: number): Promise<Boolean>;
    paginate(options: IPaginationOptions): Promise<Pagination<Notification>>;
}
