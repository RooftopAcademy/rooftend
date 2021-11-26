import { Module } from '@nestjs/common';
import { AdressesService } from './services/adresses.service';
import { AdressesController } from './controllers/adresses.controller';

@Module({
  providers: [AdressesService],
  controllers: [AdressesController],
})
export class AdressesModule {}
