import { Module } from '@nestjs/common';
import { AccountStatusController } from './controllers/account-status.controller';
import { AccountStatusEntity } from './models/account-status.entity';
import { AccountStatusService } from './services/account-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AccountStatusEntity])],
  providers: [AccountStatusService],
  controllers: [AccountStatusController],
})
export class AccountStatusModule {}
