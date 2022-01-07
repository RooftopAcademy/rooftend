import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { Delivery } from '../deliveries/entities/delivery.entity';
import { PurchasesController } from './controllers/purchases.controller';
import { PurchasesService } from './services/purchases.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Delivery])],
  providers: [PurchasesService],
  controllers: [PurchasesController],
})
export class PurchasesModule {}
