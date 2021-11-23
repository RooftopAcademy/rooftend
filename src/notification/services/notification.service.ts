import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Notification } from '../notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationRepo.find();
  }

  async findOneById(id: number | string): Promise<Notification> {
    return this.notificationRepo.findOne(id);
  }

  async create(platform: Notification): Promise<Notification> {
    return this.notificationRepo.save(platform);
  }

  async update(
    id: number | string,
    notification: Notification,
  ): Promise<UpdateResult> {
    return this.notificationRepo.update(id, notification);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.notificationRepo.delete(id);
  }
}
