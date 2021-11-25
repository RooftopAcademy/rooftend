import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountStatusController } from './controllers/account-status.controller';
import { AccountStatusEntity } from './models/account-status.entity';
import { AccountStatusService } from './services/account-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountStatusEntity])],
  providers: [AccountStatusService],
  controllers: [AccountStatusController],
})
export class AccountStatusModule {}
