import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [StoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
