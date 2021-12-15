import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasesController } from './controllers/purchases.controller';
import { Purchase } from './entities/purchase.entity';
import { PurchasesService } from './services/purchases.service';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase])],
  providers: [PurchasesService],
  controllers: [PurchasesController],
})
export class PurchasesModule {}
