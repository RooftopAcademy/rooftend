import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShippingMethodsController } from './controllers/shipping-methods.controller';
import { ShippingMethodsService } from './services/shipping-methods.service';
import { ShippingMethod } from './entities/shipping-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingMethod])],
  providers: [ShippingMethodsService],
  controllers: [ShippingMethodsController],
})
export class ShippingMethodsModule {}
