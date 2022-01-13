import { Module } from '@nestjs/common';
import { AccountStatusController } from './controllers/account-status.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [AccountStatusController],
})
export class AccountStatusModule {}
