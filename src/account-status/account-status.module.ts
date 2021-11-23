import { Module } from '@nestjs/common';
import { AccountStatusController } from './controllers/account-status.controller';
import { AccountStatusService } from './services/account-status.service';

@Module({
  providers: [AccountStatusService],
  controllers: [AccountStatusController]
})
export class AccountStatusModule { }
