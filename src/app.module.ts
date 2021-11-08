import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlatformService } from './platform/services/platform.service';
import { PlatformController } from './platform/controllers/platform.controller';
import { PlatformModule } from './platform/platform.module';

@Module({
  imports: [PlatformModule],
  controllers: [AppController, PlatformController],
  providers: [AppService, PlatformService],
})
export class AppModule {}
