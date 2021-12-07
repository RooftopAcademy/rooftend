import { Module } from '@nestjs/common';
import { OffersService } from './services/offers.service';
import { OffersController } from './controllers/offers.controller';

@Module({
  controllers: [OffersController],
  providers: [OffersService]
})
export class OffersModule {}
