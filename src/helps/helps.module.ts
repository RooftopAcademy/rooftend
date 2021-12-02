import { Module } from '@nestjs/common';
import { HelpsController } from './controllers/helps.controller';
import { HelpsService } from './services/helps.service';

@Module({
  controllers: [HelpsController],
  providers: [HelpsService]
})
export class HelpsModule {}
