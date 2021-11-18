import { Module } from '@nestjs/common';
import { AccountStatusController } from './controllers/account-status.controller';
import { AccountStatusService } from './services/account-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountStatusEntity } from './models/account-status.entity';

@Module({
  providers: [AccountStatusService],
  controllers: [AccountStatusController],
  imports: [
    TypeOrmModule.forFeature([AccountStatusEntity])
  ]
})
export class AccountStatusModule { }
