import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountStatusController } from './controllers/account-status.controller';
import { AccountStatusService } from './services/account-status.service';
import { AccountStatusEntity } from './models/account-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountStatusEntity])],
  providers: [AccountStatusService],
  controllers: [AccountStatusController],
})
export class AccountStatusModule {}
