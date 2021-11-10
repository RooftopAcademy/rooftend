import { Module } from '@nestjs/common';
import { PlatformService } from './services/platform.service';
import { PlatformController } from './controllers/platform.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Platform } from './platform.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Platform])],
  providers: [PlatformService],
  controllers: [PlatformController],
})
export class PlatformModule {}
