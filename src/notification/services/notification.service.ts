import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { UpdateNotificationDto } from '../entities/update.notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
  ) {}

  findOne(id: number): Promise<Notification> {
    return this.notificationRepo.findOne(id, {relations:['user']});
  }

  async findNotification(userId: number): Promise<Notification> {
    return await this.notificationRepo.findOne({where: { user: { id: userId } }, relations: ['user']});
  }

  create(body: any): Promise<Notification[]> {
    const notification = this.notificationRepo.create(body);

    return this.notificationRepo.save(notification);
  }

  async update(notification:Notification, notificationUpdate: UpdateNotificationDto): Promise<Notification> {
    this.notificationRepo.merge(notification,notificationUpdate);
    return this.notificationRepo.save(notification);
  }

  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<Notification>> {
    return paginate<Notification>(this.notificationRepo, options);
  }
}
