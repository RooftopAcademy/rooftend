import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationController } from './controllers/notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { CaslModule } from '../auth/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), CaslModule],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
