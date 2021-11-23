import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationController } from './controllers/notification.controller';

@Module({
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
