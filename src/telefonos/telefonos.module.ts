import { Module } from '@nestjs/common';
import { TelefonosService } from './services/telefonos.service';
import { TelefonosController } from './controllers/telefonos.controller';

@Module({
  providers: [TelefonosService],
  controllers: [TelefonosController],
})
export class TelefonosModule {}
