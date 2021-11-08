import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelefonosModule } from './phones/phones.module';

@Module({
  imports: [TelefonosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
