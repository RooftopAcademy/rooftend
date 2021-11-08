import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountStatusModule } from './account-status/account-status.module';

@Module({
  imports: [AccountStatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
