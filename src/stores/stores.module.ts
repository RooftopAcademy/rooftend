import { Module } from '@nestjs/common';
import { StoresController } from './controller/stores.controller';
import { StoresService } from './controller/stores.service';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
