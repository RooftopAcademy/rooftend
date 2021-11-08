import { Module } from '@nestjs/common';
import { PhonesService } from './services/phones.service';
import { PhonesController } from './controllers/phones.controller';

@Module({
  providers: [PhonesService],
  controllers: [PhonesController],
})
export class TelefonosModule {}
